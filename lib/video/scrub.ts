/** Pure helpers for scroll-controlled video. Kept dependency-free so they are easy to test. */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Scroll progress (0..1) of a tall section whose child is `position: sticky`. */
export function sectionProgress(rectTop: number, sectionHeight: number, viewportHeight: number) {
  const scrollable = sectionHeight - viewportHeight;
  if (scrollable <= 0) return 0;
  return clamp(-rectTop / scrollable);
}

/** progress 0..1 -> video time. Uses the real duration; stops just short of the end so the last frame renders. */
export function progressToTime(progress: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return clamp(progress) * Math.max(0, duration - 0.04);
}

/** Exponential smoothing step toward a target (frame-rate independent). */
export function ease(current: number, target: number, dtMs: number, halfLifeMs = 70) {
  const k = 1 - Math.pow(0.5, dtMs / halfLifeMs);
  return current + (target - current) * k;
}
