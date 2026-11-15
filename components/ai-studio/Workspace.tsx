"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, ImagePlus, Loader2, RefreshCw, Download, X } from "lucide-react";
import { aiStudioConfig } from "@/data/ai-studio";
import { cn } from "@/lib/utilities/cn";
import type { GenerationJob, VideoMode } from "@/types";

type ProviderInfo = { live: boolean; label: string; modes: VideoMode[]; durations: number[] };
type Phase = "idle" | "starting" | "running" | "done" | "error";

const field = "w-full min-h-[48px] rounded-lg border border-silver/20 bg-graphite px-4 text-chrome focus:border-volt focus:outline-none";
const lbl = "mb-2 block font-mono text-[11px] tracking-[0.25em] text-silver";

export function Workspace() {
  const [provider, setProvider] = useState<ProviderInfo | null>(null);
  const [mode, setMode] = useState<VideoMode>("text-to-video");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [aspect, setAspect] = useState<(typeof aiStudioConfig.aspectRatios)[number]>("16:9");
  const [duration, setDuration] = useState<number>(aiStudioConfig.durations[0]);
  const [quality, setQuality] = useState<"standard" | "high">("standard");
  const [style, setStyle] = useState(aiStudioConfig.styles[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [job, setJob] = useState<GenerationJob | null>(null);
  const [message, setMessage] = useState("");
  const [demoPreview, setDemoPreview] = useState<string | null>(null);
  const requestId = useRef<string>("");
  const pollRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    fetch("/api/ai/config").then((r) => r.json()).then(setProvider).catch(() => setProvider({ live: false, label: "Demo mode", modes: [], durations: [] }));
    return () => window.clearTimeout(pollRef.current);
  }, []);

  const live = Boolean(provider?.live);
  const modeEnabled = (m: VideoMode) => live && provider!.modes.includes(m);
  const busy = phase === "starting" || phase === "running";
  const needsImage = mode === "image-to-video";

  const onFile = (file?: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return setMessage("Please upload a PNG, JPEG or WebP image.");
    if (file.size > aiStudioConfig.maxImageBytes) return setMessage(`Image is larger than ${aiStudioConfig.maxImageBytes / 1024 / 1024} MB.`);
    const reader = new FileReader();
    reader.onload = () => { setImage(String(reader.result)); setMessage(""); };
    reader.readAsDataURL(file);
  };

  const poll = useCallback((id: string, startedAt: number) => {
    pollRef.current = window.setTimeout(async () => {
      try {
        const r = await fetch(`/api/ai/status?id=${encodeURIComponent(id)}`, { cache: "no-store" });
        const d = await r.json();
        if (!d.ok) throw new Error(d.error ?? "Status check failed.");
        const j: GenerationJob = d.job;
        setJob(j);
        if (j.status === "succeeded" && j.videoUrl) return setPhase("done");
        if (j.status === "failed") { setMessage(j.error ?? "Generation failed."); return setPhase("error"); }
        if (Date.now() - startedAt > 10 * 60 * 1000) { setMessage("Generation is taking too long. Please try again."); return setPhase("error"); }
        poll(id, startedAt);
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Status check failed.");
        setPhase("error");
      }
    }, 4000);
  }, []);

  async function generate() {
    if (busy) return; // prevent duplicate submissions
    setMessage(""); setDemoPreview(null);
    if (prompt.trim().length < 10) return setMessage("Describe your video in at least 10 characters.");
    if (needsImage && !image) return setMessage("Image-to-Video needs an uploaded image.");

    const payload = { mode, prompt: prompt.trim(), aspectRatio: aspect, duration, quality, style, ...(image ? { imageDataUrl: image } : {}) };

    if (!live) {
      // Demo mode: nothing is sent and nothing is generated.
      setDemoPreview(JSON.stringify({ ...payload, imageDataUrl: image ? "[image attached]" : undefined }, null, 2));
      return;
    }

    if (!requestId.current) requestId.current = crypto.randomUUID();
    setPhase("starting"); setJob(null);
    try {
      const r = await fetch("/api/ai/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, clientRequestId: requestId.current }) });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error ?? "Could not start generation.");
      setPhase("running");
      setJob({ id: d.jobId, status: "queued" });
      poll(d.jobId, Date.now());
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not start generation.");
      setPhase("error");
    }
  }

  const another = () => { requestId.current = ""; setPhase("idle"); setJob(null); setMessage(""); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        {/* Provider status: always honest */}
        <div role="status" className={cn("flex items-start gap-3 rounded-xl border p-4 text-sm", live ? "border-volt/40 bg-volt/10 text-chrome" : "border-crimson/40 bg-crimson/10 text-chrome")}>
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />
          {provider === null ? "Checking provider…" : live
            ? <span><strong>LIVE:</strong> connected to {provider.label}. {aiStudioConfig.costPerGenerationNote}</span>
            : <span><strong>DEMO MODE:</strong> no AI video provider is connected, so <u>no video will be generated</u>. You can explore the interface; see the README to connect a provider.</span>}
        </div>

        <fieldset>
          <legend className={lbl}>MODE</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {aiStudioConfig.modes.map((m) => {
              const enabled = !live || modeEnabled(m.id);
              return (
                <button key={m.id} type="button" disabled={!enabled} aria-pressed={mode === m.id} onClick={() => setMode(m.id)}
                  className={cn("min-h-[56px] rounded-lg border px-4 text-left transition", mode === m.id ? "border-volt bg-volt/10" : "border-silver/20 hover:border-silver/50", !enabled && "cursor-not-allowed opacity-40")}>
                  <span className="block font-display text-xs font-bold uppercase text-chrome">{m.label}</span>
                  <span className="block text-xs text-silver/60">{enabled ? m.description : "Not supported by this provider"}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="prompt" className={lbl}>PROMPT</label>
          <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={aiStudioConfig.maxPromptLength} rows={6} placeholder="Describe the scene, camera movement, lighting and mood…" className={`${field} py-3`} />
          <p className="mt-1 text-right font-mono text-[10px] text-silver/50">{prompt.length}/{aiStudioConfig.maxPromptLength}</p>
        </div>

        <div>
          <span className={lbl}>{needsImage ? "REFERENCE IMAGE *" : "REFERENCE IMAGE (OPTIONAL)"}</span>
          {image ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Uploaded reference preview" className="max-h-48 rounded-lg hairline" />
              <button type="button" onClick={() => setImage(null)} aria-label="Remove image" className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-void hairline"><X size={14} /></button>
            </div>
          ) : (
            <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-silver/30 text-sm text-silver/70 hover:border-volt">
              <ImagePlus aria-hidden /> Upload PNG, JPEG or WebP (max {aiStudioConfig.maxImageBytes / 1024 / 1024} MB)
              <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
            </label>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="aspect" className={lbl}>ASPECT RATIO</label><select id="aspect" className={field} value={aspect} onChange={(e) => setAspect(e.target.value as typeof aspect)}>{aiStudioConfig.aspectRatios.map((a) => <option key={a}>{a}</option>)}</select></div>
          <div><label htmlFor="dur" className={lbl}>DURATION</label><select id="dur" className={field} value={duration} onChange={(e) => setDuration(Number(e.target.value))}>{(live && provider!.durations.length ? provider!.durations : aiStudioConfig.durations).map((d) => <option key={d} value={d}>{d} seconds</option>)}</select></div>
          <div><label htmlFor="q" className={lbl}>QUALITY</label><select id="q" className={field} value={quality} onChange={(e) => setQuality(e.target.value as typeof quality)}>{aiStudioConfig.qualities.map((q) => <option key={q} value={q}>{q}</option>)}</select></div>
          <div><label htmlFor="style" className={lbl}>STYLE</label><select id="style" className={field} value={style} onChange={(e) => setStyle(e.target.value)}>{aiStudioConfig.styles.map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>

        {message && <p role="alert" className="rounded-lg border border-crimson/40 bg-crimson/10 p-4 text-sm text-chrome">{message}</p>}

        <button onClick={generate} disabled={busy || provider === null} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-chrome font-mono text-xs font-semibold tracking-[0.25em] text-void transition hover:bg-volt hover:text-white disabled:opacity-50 sm:w-auto sm:px-10">
          {busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> GENERATING…</> : live ? "GENERATE VIDEO" : "CHECK REQUEST (DEMO)"}
        </button>
      </div>

      {/* Output */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-2xl hairline bg-coal">
          <div className={cn("flex items-center justify-center bg-void", aspect === "9:16" ? "aspect-[9/16] max-h-[70vh] mx-auto" : aspect === "1:1" ? "aspect-square" : "aspect-video")}>
            {phase === "done" && job?.videoUrl ? (
              <video src={job.videoUrl} controls playsInline className="h-full w-full" />
            ) : busy ? (
              <div className="text-center" role="status"><Loader2 className="mx-auto h-8 w-8 animate-spin text-volt" aria-hidden /><p className="mt-3 font-mono text-xs tracking-[0.2em] text-silver">{job?.status === "processing" ? "PROCESSING" : "QUEUED"}…</p>{typeof job?.progress === "number" && <p className="text-xs text-silver/60">{job.progress}%</p>}</div>
            ) : (
              <p className="px-6 text-center font-mono text-xs tracking-[0.2em] text-silver/50">{live ? "YOUR VIDEO WILL APPEAR HERE" : "NO VIDEO. DEMO MODE"}</p>
            )}
          </div>
          {phase === "done" && job?.videoUrl && (
            <div className="flex flex-wrap gap-3 p-4">
              <a href={job.videoUrl} download target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-silver/25 px-5 font-mono text-[11px] tracking-[0.2em] text-chrome hover:border-volt"><Download size={14} aria-hidden /> DOWNLOAD</a>
              <button onClick={another} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-silver/25 px-5 font-mono text-[11px] tracking-[0.2em] text-chrome hover:border-volt"><RefreshCw size={14} aria-hidden /> GENERATE ANOTHER VERSION</button>
            </div>
          )}
          {phase === "error" && <div className="p-4"><button onClick={another} className="font-mono text-[11px] tracking-[0.2em] text-volt">TRY AGAIN</button></div>}
        </div>
        {demoPreview && (
          <div className="mt-4 rounded-xl hairline p-4">
            <p className="mb-2 font-mono text-[11px] tracking-[0.2em] text-crimson">DEMO: NOTHING WAS SENT AND NO VIDEO WAS CREATED</p>
            <pre className="overflow-x-auto text-xs text-silver/80">{demoPreview}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
