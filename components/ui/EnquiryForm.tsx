"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { enquirySchema, serviceOptions } from "@/lib/validation/enquiry";
import { siteConfig } from "@/data/site-config";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };
type Errors = Partial<Record<string, string>>;

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, o: { sitekey: string; callback: (t: string) => void }) => void } }
}

const input = "w-full min-h-[48px] rounded-lg border border-silver/20 bg-graphite px-4 text-chrome placeholder:text-silver/40 focus:border-volt focus:outline-none";

export function EnquiryForm({ initialService }: { initialService?: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState("");
  const tsRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const service = initialService && serviceOptions.includes(initialService) ? initialService : "";

  useEffect(() => {
    if (!siteKey || !tsRef.current) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => window.turnstile?.render(tsRef.current!, { sitekey: siteKey, callback: setToken });
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, [siteKey]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "sending") return; // block double submits
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const parsed = enquirySchema.safeParse({ ...raw, turnstileToken: token });
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])));
      setState({ kind: "idle" });
      return;
    }
    setErrors({});
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setState({ kind: "success" }); (e.target as HTMLFormElement).reset?.(); }
      else setState({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setState({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  if (state.kind === "success") {
    return (
      <div role="status" className="rounded-2xl border border-volt/40 bg-graphite p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-volt" aria-hidden />
        <h2 className="mt-4 font-display text-xl font-bold uppercase text-chrome">Enquiry sent</h2>
        <p className="mt-2 text-silver/75">Thank you. We will get back to you by email.</p>
      </div>
    );
  }

  const field = (name: string) => ({ id: name, name, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-err` : undefined });
  const err = (name: string) => errors[name] && <p id={`${name}-err`} className="mt-1 text-sm text-crimson">{errors[name]}</p>;
  const label = "mb-2 block font-mono text-[11px] tracking-[0.25em] text-silver";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl hairline bg-coal p-6 sm:p-8" aria-busy={state.kind === "sending"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label} htmlFor="name">FULL NAME *</label><input {...field("name")} className={input} autoComplete="name" required />{err("name")}</div>
        <div><label className={label} htmlFor="email">EMAIL *</label><input {...field("email")} type="email" className={input} autoComplete="email" required />{err("email")}</div>
        <div><label className={label} htmlFor="phone">PHONE (OPTIONAL)</label><input {...field("phone")} type="tel" className={input} autoComplete="tel" />{err("phone")}</div>
        <div><label className={label} htmlFor="business">BUSINESS NAME</label><input {...field("business")} className={input} autoComplete="organization" />{err("business")}</div>
        <div>
          <label className={label} htmlFor="service">SERVICE REQUIRED *</label>
          <select {...field("service")} defaultValue={service} className={input} required>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>{err("service")}
        </div>
        <div>
          <label className={label} htmlFor="budget">BUDGET RANGE *</label>
          <select {...field("budget")} defaultValue="" className={input} required>
            <option value="" disabled>Select a range</option>
            {siteConfig.budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>{err("budget")}
        </div>
      </div>
      <div><label className={label} htmlFor="details">PROJECT DETAILS *</label><textarea {...field("details")} rows={6} className={`${input} py-3`} placeholder="What are you building, and what should it achieve?" required />{err("details")}</div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label htmlFor="website">Leave empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      {siteKey && <div ref={tsRef} />}

      {state.kind === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-crimson/40 bg-crimson/10 p-4 text-sm text-chrome"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />{state.message}</p>
      )}
      <button type="submit" disabled={state.kind === "sending"} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-chrome font-mono text-xs font-semibold tracking-[0.25em] text-void transition hover:bg-volt hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10">
        {state.kind === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> SENDING…</> : "SEND ENQUIRY"}
      </button>
    </form>
  );
}
