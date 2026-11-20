import { WorldId } from "@/types/world";

export type SignalChannel = 0 | 1 | 2;

export interface SignalNodeData {
  id: string;
  index: number; // 0 to 15 (4x4)
  row: number; // 0 to 3
  col: number; // 0 to 3
  channel: SignalChannel;
  state: "dormant" | "connected" | "energized";
}

export type GameStatus = "idle" | "countdown" | "playing" | "paused" | "finished";

export interface SignalPersona {
  id: string;
  title: string;
  tagline: string;
  description: string;
  recommendedWorld: WorldId;
  badgeColor: string;
}

export interface GameMetrics {
  score: number;
  longestChain: number;
  totalConnections: number;
  combos: number;
  mistakes: number;
  channelCounts: [number, number, number];
  startTime: number;
  endTime: number;
}
