"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-crimson">SOMETHING WENT WRONG</p>
      <h1 className="metal mt-4 font-display text-4xl font-extrabold">HUMAN ERROR</h1>
      <button onClick={reset} className="mt-8 min-h-[48px] rounded-full bg-chrome px-7 font-mono text-xs font-semibold tracking-[0.2em] text-void">TRY AGAIN</button>
    </main>
  );
}
