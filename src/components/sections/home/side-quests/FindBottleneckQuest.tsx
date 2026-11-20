"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    score: "good" | "medium" | "bottleneck";
    insight: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How do potential customers currently book or inquire on your website?",
    options: [
      {
        label: "Direct interactive booking & instant WhatsApp integration",
        score: "good",
        insight: "Optimal setup with minimum friction for Indian mobile users.",
      },
      {
        label: "Standard static contact form that sends an email to our inbox",
        score: "medium",
        insight: "Forms often suffer from delayed response times and lower mobile completion.",
      },
      {
        label: "They have to call our phone number or download a static PDF",
        score: "bottleneck",
        insight: "Major drop-off bottleneck: most mobile users leave when forced to make a phone call.",
      },
    ],
  },
  {
    id: 2,
    question: "How fast does your website open on a real mobile device on 4G?",
    options: [
      {
        label: "Instantaneous (under 1 second)",
        score: "good",
        insight: "Sub-second edge rendering protects your ad budget and SEO visibility.",
      },
      {
        label: "Noticeable 3 to 5 second pause with visible loading spinners",
        score: "medium",
        insight: "53% of mobile visits are abandoned if pages take over 3 seconds to load.",
      },
      {
        label: "Heavy or clunky with layout jumps and unoptimized large images",
        score: "bottleneck",
        insight: "High bounce rate and penalized Google Core Web Vitals score.",
      },
    ],
  },
  {
    id: 3,
    question: "Do you have full ownership of your source code and hosting?",
    options: [
      {
        label: "Yes, 100% full code ownership in a private GitHub repository",
        score: "good",
        insight: "Maximum business independence with zero platform lock-in.",
      },
      {
        label: "Managed by a past agency with limited access or unclear ownership",
        score: "medium",
        insight: "Vulnerable to sudden hostage scenarios or expensive redesign bills.",
      },
      {
        label: "Built on a closed proprietary builder with monthly renewal fees",
        score: "bottleneck",
        insight: "You cannot export clean code or customize beyond vendor limitations.",
      },
    ],
  },
];

export function FindBottleneckQuest() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);

    if (currentQIndex + 1 < QUESTIONS.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const currentQ = QUESTIONS[currentQIndex];

  // Calculate assessment
  const bottleneckCount = answers.filter(
    (ansIdx, qIdx) => QUESTIONS[qIdx]?.options[ansIdx]?.score === "bottleneck"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold">
              Quest 004 // Self-Check
            </span>
            <span className="text-xs text-muted font-mono">3-Question Diagnostic</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-text mt-1">
            Find the Bottleneck: 60-Second Architecture Check
          </h4>
        </div>

        {isFinished && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Start Over
          </Button>
        )}
      </div>

      {!isFinished ? (
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>QUESTION {currentQIndex + 1} OF {QUESTIONS.length}</span>
            <span>Progress: {Math.round(((currentQIndex + 1) / QUESTIONS.length) * 100)}%</span>
          </div>

          <h5 className="font-display text-lg sm:text-xl font-bold text-text">
            {currentQ.question}
          </h5>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-4 rounded-xl border border-border bg-bg/50 hover:bg-bg hover:border-text transition-all text-sm group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-text group-hover:text-accent transition-colors">
                    {option.label}
                  </div>
                  <div className="text-xs text-muted">{option.insight}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-accent text-white">
              Self-Assessment Summary
            </span>
            <span className="text-xs text-muted font-mono">Illustrative Diagnostic</span>
          </div>

          <div className="space-y-2">
            <h5 className="font-display text-xl sm:text-2xl font-bold text-text">
              {bottleneckCount > 0
                ? `Identified ${bottleneckCount} High-Priority Improvement Area${bottleneckCount > 1 ? "s" : ""}`
                : "Your Digital Architecture Foundation is Strong"}
            </h5>
            <p className="text-sm text-muted leading-relaxed">
              Based on your answers, here is our honest architectural takeaway:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {answers.map((ansIdx, qIdx) => {
              const opt = QUESTIONS[qIdx]?.options[ansIdx];
              return (
                <div key={qIdx} className="p-4 rounded-lg bg-bg-secondary border border-border space-y-2">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                    {opt.score === "good" ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Performance
                      </span>
                    ) : (
                      <span className="text-accent flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Opportunity
                      </span>
                    )}
                  </div>
                  <div className="text-text font-sans font-semibold text-xs leading-snug">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-muted font-sans leading-relaxed">
                    {opt.insight}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs">
            <p className="text-muted">
              Note: This is an illustrative self-check designed to identify common conversion and workflow friction.
            </p>
            <Button href="/contact" variant="primary" size="default">
              Discuss Your Site Scope ↗
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted font-mono">
        <span>Outcome: Understand where users drop off and how clean code improves conversion.</span>
        <Button href="/contact" variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          Schedule Architectural Review
        </Button>
      </div>
    </div>
  );
}
