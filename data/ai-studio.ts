import type { VideoMode } from "@/types";

/** AI Studio configuration. Provider capabilities (what is actually enabled) come from lib/ai-providers. */
export const aiStudioConfig = {
  modes: [
    { id: "text-to-video", label: "Text-to-Video", description: "Describe a scene and generate a video." },
    { id: "image-to-video", label: "Image-to-Video", description: "Animate an uploaded image." },
    { id: "ad-video", label: "AI Advertisement", description: "Promotional video for a product or service." },
    { id: "cinematic", label: "Cinematic Video", description: "Film-style shots with dramatic lighting." },
    { id: "social", label: "Social Media Video", description: "Short vertical or square clips." },
  ] as { id: VideoMode; label: string; description: string }[],
  aspectRatios: ["16:9", "9:16", "1:1"] as const,
  durations: [5, 8, 10],
  qualities: ["standard", "high"] as const,
  styles: ["Cinematic", "Realistic", "Futuristic", "Minimal", "Animated"],
  maxPromptLength: 1500,
  maxImageBytes: 5 * 1024 * 1024,
  /** Requests per window, per visitor IP. */
  rateLimit: { max: 5, windowMs: 10 * 60 * 1000 },
  /** Shown before generation when a live provider is connected. Set your own real figure. */
  costPerGenerationNote: "Provider charges apply per generation. Set your credit pricing in data/pricing.ts.",
};
