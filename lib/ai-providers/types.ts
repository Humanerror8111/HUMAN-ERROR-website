import type { GenerationJob, GenerationRequest, VideoMode } from "@/types";

export interface VideoProvider {
  id: string;
  label: string;
  /** True only when real credentials are configured. */
  live: boolean;
  /** Modes this provider genuinely supports. The UI disables everything else. */
  modes: VideoMode[];
  durations: number[];
  create(req: GenerationRequest): Promise<{ jobId: string }>;
  status(jobId: string): Promise<GenerationJob>;
}
