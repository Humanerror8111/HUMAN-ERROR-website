import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Services", description: "Website development, e-commerce, school sites, web apps, UI/UX, AI integration, automation and more." };

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero eyebrow="SERVICES" title="Everything you need to build digitally" text="Eleven focused services. Content on this page is edited in data/services.ts." />
      <div className="mx-auto max-w-7xl space-y-px px-4 pb-24 sm:px-6 lg:px-8">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <section id={s.slug} className="scroll-mt-28 grid gap-8 border-t border-silver/10 py-14 lg:grid-cols-2 lg:gap-14">
              <div className={i % 2 ? "lg:order-2" : ""}><ServiceVisual name={s.icon} index={i} /></div>
              <div>
                <p className="font-mono text-xs tracking-[0.3em] text-crimson">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-chrome sm:text-3xl">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-silver/80">{s.description}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-mono text-[11px] tracking-[0.3em] text-volt">KEY FEATURES</h3>
                    <ul className="space-y-2 text-sm text-silver/80">{s.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden />{f}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="mb-3 font-mono text-[11px] tracking-[0.3em] text-volt">BENEFITS</h3>
                    <ul className="space-y-2 text-sm text-silver/80">{s.benefits.map((b) => <li key={b} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />{b}</li>)}</ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/contact?service=${encodeURIComponent(s.title)}`}>ENQUIRE ABOUT THIS</Button>
                  <Button href="/contact" variant="ghost">CONTACT US</Button>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
