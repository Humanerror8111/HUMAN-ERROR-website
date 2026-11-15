import { z } from "zod";
import { aiStudioConfig } from "@/data/ai-studio";

export const generationSchema = z.object({
  mode: z.enum(["text-to-video", "image-to-video", "ad-video", "cinematic", "social"]),
  prompt: z.string().trim().min(10, "Describe your video in at least 10 characters").max(aiStudioConfig.maxPromptLength),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]),
  duration: z.number().int().min(1).max(30),
  quality: z.enum(["standard", "high"]),
  style: z.string().max(40),
  imageDataUrl: z
    .string()
    .regex(/^data:image\/(png|jpeg|webp);base64,/, "Image must be PNG, JPEG or WebP")
    .max(Math.ceil(aiStudioConfig.maxImageBytes * 1.4))
    .optional(),
  /** Client-generated id; used to ignore accidental double submits. */
  clientRequestId: z.string().min(8).max(64),
});
