"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useWorld } from "@/context/WorldContext";
import {
  SignalNodeData,
  SignalChannel,
  GameStatus,
  GameMetrics,
} from "@/types/signal-game";
import { SignalBoard, areNodesAdjacent } from "./SignalBoard";
import { SignalGameOver } from "./SignalGameOver";
import {
  playSignalNodeTone,
  playSignalEnergizeTone,
  playSignalErrorTone,
  playSignalCompleteChord,
} from "@/lib/signal-audio";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  Zap,
  CheckCircle2,
  Activity,
} from "lucide-react";

const GAME_DURATION = 45; // 45 seconds

// Helper to generate a fresh 4x4 node grid
function generateInitialNodes(): SignalNodeData[] {
  const nodes: SignalNodeData[] = [];
  for (let i = 0; i < 16; i++) {
    nodes.push({
      id: `node-${i}-${Math.random().toString(36).substring(2, 7)}`,
      index: i,
      row: Math.floor(i / 4),
      col: i % 4,
      channel: (Math.floor(Math.random() * 3) as SignalChannel),
      state: "dormant",
    });
  }
  return nodes;
}

export function SignalGameSection() {
  const { config, switchWorld, soundEnabled, setSoundEnabled } = useWorld();

  const [status, setStatus] = useState<GameStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [nodes, setNodes] = useState<SignalNodeData[]>(generateInitialNodes());
  const [chain, setChain] = useState<SignalNodeData[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  // Live Metrics
  const [score, setScore] = useState(0);
  const [combos, setCombos] = useState(0);
  const [longestChain, setLongestChain] = useState(0);
  const [totalConnections, setTotalConnections] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [channelCounts, setChannelCounts] = useState<[number, number, number]>([0, 0, 0]);
  const startTimeRef = useRef<number>(0);

  // Start a new game
  const startGame = useCallback(() => {
    setNodes(generateInitialNodes());
    setChain([]);
    setScore(0);
    setCombos(0);
    setLongestChain(0);
    setTotalConnections(0);
    setMistakes(0);
    setChannelCounts([0, 0, 0]);
    setTimeLeft(GAME_DURATION);
    startTimeRef.current = Date.now();
    setStatus("playing");
  }, []);

  // Timer countdown loop
  useEffect(() => {
    if (status !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("finished");
          playSignalCompleteChord(soundEnabled);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, soundEnabled]);

  // Auto-pause when tab visibility changes
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && status === "playing") {
        setStatus("paused");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [status]);

  // Global keyboard shortcuts (P to pause, M to mute)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        if (status === "playing") setStatus("paused");
        else if (status === "paused") setStatus("playing");
      } else if (e.key === "m" || e.key === "M") {
        setSoundEnabled(!soundEnabled);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, soundEnabled, setSoundEnabled]);

  // Handle adding node to active chain
  const handleAddToChain = useCallback(
    (node: SignalNodeData) => {
      if (status !== "playing") return;

      setChain((prevChain) => {
        // If empty chain, start it
        if (prevChain.length === 0) {
          playSignalNodeTone(0, soundEnabled);
          return [node];
        }

        // If clicking/touching the second-to-last node, backtrack!
        if (prevChain.length >= 2 && prevChain[prevChain.length - 2].index === node.index) {
          return prevChain.slice(0, prevChain.length - 1);
        }

        // If clicking node already in chain (other than backtrack), ignore
        if (prevChain.some((c) => c.index === node.index)) {
          return prevChain;
        }

        const lastNode = prevChain[prevChain.length - 1];

        // Valid connection: must be adjacent AND match channel
        if (areNodesAdjacent(lastNode, node) && lastNode.channel === node.channel) {
          playSignalNodeTone(prevChain.length, soundEnabled);
          return [...prevChain, node];
        } else {
          // Incompatible node touched
          playSignalErrorTone(soundEnabled);
          return prevChain;
        }
      });
    },
    [status, soundEnabled]
  );

  // Commit valid chain
  const handleCommitChain = useCallback(() => {
    if (chain.length < 2) {
      if (chain.length === 1) {
        setMistakes((m) => m + 1);
        playSignalErrorTone(soundEnabled);
      }
      setChain([]);
      return;
    }

    const chainLen = chain.length;
    playSignalEnergizeTone(chainLen, soundEnabled);

    // Score calculation
    const multiplier = chainLen >= 5 ? 3 : chainLen >= 4 ? 2 : 1;
    const addedScore = chainLen * 100 * multiplier;

    setScore((prev) => prev + addedScore);
    setCombos((prev) => prev + 1);
    setLongestChain((prev) => Math.max(prev, chainLen));
    setTotalConnections((prev) => prev + chainLen);

    // Update channel count
    const channelIdx = chain[0].channel;
    setChannelCounts((prev) => {
      const next = [...prev] as [number, number, number];
      next[channelIdx] += chainLen;
      return next;
    });

    // Mark nodes as energized, then replace them with fresh nodes
    const chainedIndices = new Set(chain.map((c) => c.index));

    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (chainedIndices.has(n.index)) {
          return {
            id: `node-${n.index}-${Math.random().toString(36).substring(2, 7)}`,
            index: n.index,
            row: n.row,
            col: n.col,
            channel: (Math.floor(Math.random() * 3) as SignalChannel),
            state: "energized",
          };
        }
        return n;
      })
    );

    setChain([]);
  }, [chain, soundEnabled]);

  const handleClearChain = useCallback(() => {
    setChain([]);
  }, []);

  const metrics: GameMetrics = {
    score,
    longestChain,
    totalConnections,
    combos,
    mistakes,
    channelCounts,
    startTime: startTimeRef.current,
    endTime: Date.now(),
  };

  return (
    <Section id="signal" className="border-t border-border bg-surface transition-colors duration-300">
      <Container>
        <div className={`${config.cardStyle} p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all shadow-xl`}>
          {/* Top Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: config.colors.accent }}
              />
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                SHREEJAN SIGNAL // SYSTEM CALIBRATION
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border border-border transition-colors ${
                  soundEnabled ? "text-accent bg-accent/10" : "text-muted hover:text-text"
                }`}
                title={soundEnabled ? "Mute Game Sound" : "Enable Game Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowHelp((prev) => !prev)}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-text transition-colors"
                title="How to play"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instructions Modal / Slide-down */}
          {showHelp && (
            <div className="mb-6 p-4 rounded-xl bg-bg border border-border text-xs font-sans space-y-2 animate-in fade-in">
              <div className="font-mono font-bold text-accent uppercase text-[10px]">
                How to play:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-text">
                <li>
                  <strong>Connect matching nodes:</strong> Tap or drag between horizontally, vertically,
                  or diagonally adjacent nodes of the same channel.
                </li>
                <li>
                  <strong>Energize chains:</strong> Release pointer or tap &ldquo;Energize Chain&rdquo;
                  when you have 2 or more nodes selected.
                </li>
                <li>
                  <strong>45-Second Countdown:</strong> Build the strongest signal before time expires.
                </li>
                <li>
                  <strong>Controls:</strong> Arrow keys to navigate, Space/Enter to connect, C/E to
                  commit, P to pause, M to mute.
                </li>
              </ul>
            </div>
          )}

          {/* 1. STATE: IDLE */}
          {status === "idle" && (
            <div className="py-8 sm:py-12 text-center max-w-xl mx-auto space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-accent/15 text-accent font-bold">
                  INTERACTIVE CALIBRATION GAME
                </span>
                <h3 className={`${config.fontClass.display} text-3xl sm:text-4xl md:text-5xl font-bold text-text tracking-tight`}>
                  Build a signal. Keep the chain alive.
                </h3>
                <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
                  Before you leave, calibrate your digital frequency. Connect adjacent matching nodes
                  to construct unbroken system chains before the 45-second clock runs out.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-accent" />
                  <span>45 Seconds</span>
                </div>
                <div>•</div>
                <div>Drag or Tap Adjacent Nodes</div>
                <div>•</div>
                <div>Unlocks Your Digital Persona</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-xl bg-accent text-white font-mono text-sm font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Initialize Signal</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. STATE: PLAYING & PAUSED */}
          {(status === "playing" || status === "paused") && (
            <div className="space-y-6 animate-in fade-in">
              {/* HUD Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                {/* Score & Multiplier Left */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-bg border border-border">
                    <span className="text-[10px] text-muted uppercase block">Score</span>
                    <span className="text-xl sm:text-2xl font-black text-text">
                      {score.toLocaleString()}
                    </span>
                  </div>

                  {combos > 0 && (
                    <div className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {combos}x COMBO
                    </div>
                  )}
                </div>

                {/* Clock & Pause Right */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-bg border border-border text-right min-w-[90px]">
                    <span className="text-[10px] text-muted uppercase block">Clock</span>
                    <span
                      className={`text-xl sm:text-2xl font-black ${
                        timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-text"
                      }`}
                    >
                      00:{timeLeft.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <button
                    onClick={() => setStatus(status === "playing" ? "paused" : "playing")}
                    className="p-3 rounded-lg border border-border bg-bg text-text hover:bg-surface transition-colors"
                    title={status === "playing" ? "Pause Game" : "Resume Game"}
                  >
                    {status === "playing" ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>
                </div>
              </div>

              {/* Pause Overlay if Paused */}
              {status === "paused" ? (
                <div className="py-16 text-center space-y-4">
                  <div className="font-mono text-sm uppercase text-accent font-bold">
                    [ SYSTEM PAUSED ]
                  </div>
                  <h4 className={`${config.fontClass.display} text-2xl font-bold text-text`}>
                    Signal Suspended
                  </h4>
                  <p className="text-xs text-muted font-sans">
                    Press P or click below to resume your signal chain.
                  </p>
                  <button
                    onClick={() => setStatus("playing")}
                    className="px-6 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:opacity-90"
                  >
                    Resume Run
                  </button>
                </div>
              ) : (
                /* Signal Board */
                <SignalBoard
                  nodes={nodes}
                  chain={chain}
                  config={config}
                  onAddToChain={handleAddToChain}
                  onCommitChain={handleCommitChain}
                  onClearChain={handleClearChain}
                />
              )}

              {/* Bottom Chain Status Bar */}
              {status === "playing" && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted">Current Chain:</span>
                    <span className="font-bold text-text">
                      {chain.length} {chain.length === 1 ? "node" : "nodes"}
                    </span>
                    {chain.length >= 2 && (
                      <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-bold text-[10px]">
                        +{chain.length * 100 * (chain.length >= 4 ? 2 : 1)} PTS
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {chain.length > 0 && (
                      <button
                        onClick={handleClearChain}
                        className="px-3 py-1.5 rounded-lg border border-border text-muted hover:text-text text-[11px]"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={handleCommitChain}
                      disabled={chain.length < 2}
                      className={`px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
                        chain.length >= 2
                          ? "bg-accent text-white shadow-sm hover:opacity-90"
                          : "bg-bg text-muted border border-border opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Energize Chain</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. STATE: FINISHED (GAME OVER OUTCOME) */}
          {status === "finished" && (
            <SignalGameOver
              metrics={metrics}
              config={config}
              onReplay={startGame}
              onSwitchWorld={switchWorld}
            />
          )}
        </div>
      </Container>
    </Section>
  );
}
