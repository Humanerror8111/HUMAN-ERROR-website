"use client";

import { useEffect, useRef } from "react";

/** Subtle atmospheric particles. Pauses off-screen / hidden tab; skipped for reduced motion. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 640 ? 28 : 60;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.4,
      s: 0.015 + Math.random() * 0.05, d: Math.random() * 6.28,
      c: Math.random() < 0.18 ? "211,33,59" : Math.random() < 0.5 ? "45,123,255" : "201,206,216",
    }));

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y -= p.s * dt; p.x += Math.sin(now / 2400 + p.d) * 0.004 * dt;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const a = 0.25 + 0.35 * Math.sin(now / 1200 + p.d);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${Math.max(0.05, a)})`;
        ctx.arc(p.x * w, p.y * h, p.r, 0, 6.283);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden className={className ?? "absolute inset-0 h-full w-full"} />;
}
