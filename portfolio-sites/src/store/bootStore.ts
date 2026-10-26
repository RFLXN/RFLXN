import { create } from "zustand";
import config from "../config/boot.json";

export type BootLogType = "plain" | "ok" | "skip" | "warn" | "fail";
export const logType = (value: string): BootLogType =>
  ["ok", "skip", "warn", "fail"].includes(value)
    ? (value as BootLogType)
    : "plain";
export function logBadge(type: BootLogType, completed: boolean) {
  if (type === "plain") return "";
  return completed
    ? { ok: "[  OK  ]", skip: "[ SKIP ]", warn: "[ WARN ]", fail: "[ FAIL ]" }[
        type
      ]
    : "[ .... ]";
}
interface BootConfig {
  enabled: boolean;
  title: string | string[];
  titleLabel?: string;
  subtitle: string;
  transitionMs: number;
  logs: { text: string; durationMs: number; type: BootLogType }[];
}
export const bootConfig: BootConfig = {
  ...config,
  logs: config.logs.map((line) => ({
    ...line,
    type: logType(line.type ?? "plain"),
  })),
};
export const delay = (ms: number) =>
  Number.isFinite(ms) ? Math.min(2_147_483_647, Math.max(0, ms)) : 0;
interface BootState {
  phase: "booting" | "leaving" | "ready";
  visibleCount: number;
  completedCount: number;
  advance: () => void;
  skip: () => void;
  complete: () => void;
}
// No persistence: every fresh page load starts a new boot sequence.
export const useBootStore = create<BootState>((set) => ({
  phase: bootConfig.enabled && bootConfig.logs.length ? "booting" : "ready",
  visibleCount: 1,
  completedCount: 0,
  advance: () =>
    set((state) =>
      state.phase !== "booting"
        ? state
        : state.visibleCount < bootConfig.logs.length
          ? {
              visibleCount: state.visibleCount + 1,
              completedCount: state.visibleCount,
            }
          : { phase: "leaving", completedCount: state.visibleCount },
    ),
  skip: () =>
    set((state) => (state.phase === "booting" ? { phase: "leaving" } : state)),
  complete: () => set({ phase: "ready" }),
}));
