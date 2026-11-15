import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/enquiry";
import { clientIp, rateLimit } from "@/lib/utilities/rate-limit";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`enquiry:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot is a bot; answer generically.
    return NextResponse.json({ ok: false, error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const d = parsed.data;

  // Optional Cloudflare Turnstile verification
  if (process.env.TURNSTILE_SECRET_KEY) {
    const form = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: d.turnstileToken ?? "", remoteip: ip });
    const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form }).then((r) => r.json()).catch(() => null);
    if (!v?.success) return NextResponse.json({ ok: false, error: "Spam check failed. Please retry." }, { status: 400 });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    // Never pretend success when nothing can receive the message.
    return NextResponse.json(
      { ok: false, error: "The enquiry system is not connected yet, so your message was NOT sent. Please contact us by email or WhatsApp instead." },
      { status: 503 },
    );
  }

  const html = `<h2>New HUMAN ERROR enquiry</h2>
<p><b>Name:</b> ${esc(d.name)}<br><b>Email:</b> ${esc(d.email)}<br><b>Phone:</b> ${esc(d.phone || "-")}<br><b>Business:</b> ${esc(d.business || "-")}<br><b>Service:</b> ${esc(d.service)}<br><b>Budget:</b> ${esc(d.budget)}</p>
<p style="white-space:pre-wrap">${esc(d.details)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: ENQUIRY_FROM_EMAIL, to: [ENQUIRY_TO_EMAIL], reply_to: d.email, subject: `New enquiry: ${d.service} (${d.name})`, html }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.json({ ok: false, error: "We could not deliver your message. Please try again or contact us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
