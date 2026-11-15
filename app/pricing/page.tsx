import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { aiCreditConfig, customQuote, formatPrice, packages } from "@/data/pricing";

export const metadata: Metadata = { title: "Pricing", description: "Website packages and AI Studio credit plans." };

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero eyebrow="PRICING" title="Packages & quotes" text="Prices are set in data/pricing.ts. Where no public price is set, we quote in writing before any work begins." />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p) => (
            <article key={p.id} className={`flex flex-col rounded-2xl p-7 ${p.highlighted ? "border border-volt/60 bg-graphite shadow-[0_0_60px_-20px_#2d7bff]" : "hairline bg-graphite/40"}`}>
              <h2 className="font-display text-xl font-extrabold uppercase text-chrome">{p.name}</h2>
              <p className="mt-2 text-sm text-silver/70">{p.summary}</p>
              <p className="mt-6 font-display text-2xl font-bold text-chrome">{formatPrice(p.price, p.currency)}</p>
              {p.priceNote && <p className="font-mono text-[10px] tracking-[0.2em] text-silver/50">{p.priceNote}</p>}
              <h3 className="mb-3 mt-7 font-mono text-[11px] tracking-[0.3em] text-volt">INCLUDED</h3>
              <ul className="space-y-2 text-sm text-silver/80">{p.included.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden />{i}</li>)}</ul>
              <h3 className="mb-2 mt-6 font-mono text-[11px] tracking-[0.3em] text-volt">BEST FOR</h3>
              <p className="text-sm text-silver/70">{p.useCases.join(" · ")}</p>
              <h3 className="mb-2 mt-6 font-mono text-[11px] tracking-[0.3em] text-volt">OPTIONAL ADD-ONS</h3>
              <p className="text-sm text-silver/70">{p.addOns.join(" · ")}</p>
              <div className="mt-auto pt-8"><Button href={`/contact?service=${encodeURIComponent("Pricing / custom quote")}`} className="w-full" variant={p.highlighted ? "primary" : "ghost"}>{p.cta.toUpperCase()}</Button></div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl hairline p-8 text-center">
          <h2 className="font-display text-xl font-bold uppercase text-chrome">{customQuote.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-silver/75">{customQuote.text}</p>
          <div className="mt-6"><Button href="/contact">REQUEST A CUSTOM QUOTE</Button></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-2 font-display text-2xl font-extrabold uppercase text-chrome">AI Studio credits</h2>
        <p className="mb-8 text-silver/70">{aiCreditConfig.note}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {aiCreditConfig.plans.map((c) => (
            <div key={c.id} className="rounded-xl hairline p-6 opacity-80">
              <h3 className="font-display font-bold uppercase text-chrome">{c.name}</h3>
              <p className="mt-2 font-mono text-sm text-silver/70">{c.price === null ? "Not yet available" : formatPrice(c.price, c.currency)}</p>
              <p className="mt-1 text-xs text-silver/50">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
