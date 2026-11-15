import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { about, whyChoose } from "@/data/content";

export const metadata: Metadata = { title: "About", description: "About HUMAN ERROR, a digital technology and creative studio." };

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero eyebrow="ABOUT" title={about.headline} />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-silver/80">{about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        <div className="space-y-6">
          {about.values.map((v) => (
            <div key={v.title} className="rounded-2xl hairline p-6"><h2 className="font-display text-lg font-bold uppercase text-chrome">{v.title}</h2><p className="mt-2 text-silver/75">{v.text}</p></div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-mono text-[11px] tracking-[0.35em] text-volt">WHY CHOOSE US</h2>
        <ul className="grid gap-4 sm:grid-cols-2">{whyChoose.map((w) => <li key={w.title} className="rounded-xl hairline p-5"><strong className="text-chrome">{w.title}.</strong> <span className="text-silver/75">{w.text}</span></li>)}</ul>
        <div className="mt-12"><Button href="/contact">WORK WITH US</Button></div>
      </div>
    </main>
  );
}
