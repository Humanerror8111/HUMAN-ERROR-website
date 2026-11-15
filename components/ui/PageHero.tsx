import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-volt/10 blur-[120px]" aria-hidden />
      <Reveal className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-volt">{eyebrow}</p>
        <h1 className="metal max-w-4xl font-display text-4xl font-black uppercase leading-[1] sm:text-6xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver/80">{text}</p>}
      </Reveal>
    </section>
  );
}
