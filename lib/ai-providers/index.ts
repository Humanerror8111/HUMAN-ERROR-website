import { noneProvider } from "./none";
import { replicateProvider } from "./replicate";
import type { VideoProvider } from "./types";

/** Add new providers here and select with AI_PROVIDER in the environment. */
const registry: Record<string, VideoProvider> = {
  none: noneProvider,
  replicate: replicateProvider,
};

export function getProvider(): VideoProvider {
  const p = registry[process.env.AI_PROVIDER ?? "none"] ?? noneProvider;
  return p.live ? p : noneProvider;
}
