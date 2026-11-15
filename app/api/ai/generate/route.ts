import { NextResponse } from "next/server";
import { aiStudioConfig } from "@/data/ai-studio";
import { getProvider } from "@/lib/ai-providers";
import { generationSchema } from "@/lib/validation/ai";
import { clientIp, rateLimit } from "@/lib/utilities/rate-limit";

export const runtime = "nodejs";

/** Remember recent client request ids so accidental double-submits map to the same job. */
const recent = new Map<string, { jobId: string; at: number }>();

export async function POST(req: Request) {
  const provider = getProvider();
  if (!provider.live) {
    return NextResponse.json({ ok: false, demo: true, error: "Demo mode: no AI provider is connected, so no video can be generated." }, { status: 503 });
  }

  const ip = clientIp(req);
  const rl = rateLimit(`ai:${ip}`, aiStudioConfig.rateLimit.max, aiStudioConfig.rateLimit.windowMs);
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Generation limit reached. Please try again later." }, { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });

  const body = await req.json().catch(() => null);
  const parsed = generationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
  const r = parsed.data;

  if (!provider.modes.includes(r.mode)) return NextResponse.json({ ok: false, error: "This mode is not supported by the connected provider." }, { status: 400 });
  if (r.mode === "image-to-video" && !r.imageDataUrl) return NextResponse.json({ ok: false, error: "Please upload an image for Image-to-Video." }, { status: 400 });

  const dup = recent.get(r.clientRequestId);
  if (dup && Date.now() - dup.at < 10 * 60 * 1000) return NextResponse.json({ ok: true, jobId: dup.jobId, duplicate: true });

  try {
    const { jobId } = await provider.create(r);
    recent.set(r.clientRequestId, { jobId, at: Date.now() });
    return NextResponse.json({ ok: true, jobId });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Generation failed to start." }, { status: 502 });
  }
}
