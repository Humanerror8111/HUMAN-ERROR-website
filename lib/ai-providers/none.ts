import type { VideoProvider } from "./types";

/** Demo mode: no provider connected. It never creates jobs or videos. */
export const noneProvider: VideoProvider = {
  id: "none",
  label: "Demo mode (no provider connected)",
  live: false,
  modes: [],
  durations: [],
  async create() {
    throw new Error("No AI video provider is connected.");
  },
  async status() {
    throw new Error("No AI video provider is connected.");
  },
};
