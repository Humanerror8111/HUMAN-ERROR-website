import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai-providers";

export const dynamic = "force-dynamic";

/** Public, secret-free description of what the connected provider supports. */
export async function GET() {
  const p = getProvider();
  return NextResponse.json({ live: p.live, label: p.label, modes: p.modes, durations: p.durations });
}
