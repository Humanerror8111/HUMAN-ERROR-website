import type { GenerationJob, GenerationRequest } from "@/types";
import type { VideoProvider } from "./types";

/**
 * Replicate adapter (https://replicate.com). Input field names differ between
 * models, so adapt `buildInput` to the model you choose (see its API tab).
 * Set REPLICATE_API_TOKEN and REPLICATE_VIDEO_MODEL ("owner/name") in the environment.
 */
const API = "https://api.replicate.com/v1";

function headers() {
  return { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`, "Content-Type": "application/json" };
}

function buildInput(req: GenerationRequest) {
  const input: Record<string, unknown> = {
    prompt: `${req.prompt}. Style: ${req.style}.`,
    aspect_ratio: req.aspectRatio,
    duration: req.duration,
  };
  if (req.imageDataUrl && process.env.REPLICATE_SUPPORTS_IMAGE === "true") input.image = req.imageDataUrl;
  return input;
}

const supportsImage = process.env.REPLICATE_SUPPORTS_IMAGE === "true";

export const replicateProvider: VideoProvider = {
  id: "replicate",
  label: "Replicate",
  live: Boolean(process.env.REPLICATE_API_TOKEN && process.env.REPLICATE_VIDEO_MODEL),
  modes: supportsImage
    ? ["text-to-video", "image-to-video", "ad-video", "cinematic", "social"]
    : ["text-to-video", "ad-video", "cinematic", "social"],
  durations: [5, 8, 10],

  async create(req) {
    const model = process.env.REPLICATE_VIDEO_MODEL!;
    const res = await fetch(`${API}/models/${model}/predictions`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ input: buildInput(req) }),
    });
    if (!res.ok) throw new Error(`Provider rejected the request (${res.status}).`);
    const data = (await res.json()) as { id: string };
    return { jobId: data.id };
  },

  async status(jobId): Promise<GenerationJob> {
    const res = await fetch(`${API}/predictions/${encodeURIComponent(jobId)}`, { headers: headers(), cache: "no-store" });
    if (!res.ok) throw new Error(`Provider status check failed (${res.status}).`);
    const d = (await res.json()) as { id: string; status: string; output?: string | string[]; error?: string };
    const out = Array.isArray(d.output) ? d.output[0] : d.output;
    if (d.status === "succeeded") return { id: d.id, status: "succeeded", progress: 100, videoUrl: out };
    if (d.status === "failed" || d.status === "canceled") return { id: d.id, status: "failed", error: d.error ?? "Generation failed." };
    return { id: d.id, status: d.status === "starting" ? "queued" : "processing" };
  },
};
