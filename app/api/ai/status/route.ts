import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai-providers";
import { clientIp, rateLimit } from "@/lib/utilities/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const provider = getProvider();
  if (!provider.live) return NextResponse.json({ ok: false, demo: true, error: "Demo mode." }, { status: 503 });

  const rl = rateLimit(`aistatus:${clientIp(req)}`, 120, 10 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Too many status checks." }, { status: 429 });

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[A-Za-z0-9_-]{6,80}$/.test(id)) return NextResponse.json({ ok: false, error: "Invalid job id." }, { status: 400 });

  try {
    return NextResponse.json({ ok: true, job: await provider.status(id) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Status check failed." }, { status: 502 });
  }
}
