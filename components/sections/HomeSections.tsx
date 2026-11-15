import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Particles } from "@/components/animations/Particles";
import { siteConfig } from "@/data/site-config";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { packages, formatPrice } from "@/data/pricing";
import { faqs, process, whyChoose, about } from "@/data/content";
import { StatusBadge } from "@/components/portfolio/StatusBadge";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export function MainHero() {
  const h = siteConfig.home;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-void via-coal to-void py-28 sm:py-40">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <Particles className="absolute inset-0 h-full w-full opacity-60" />
      <div className={`${wrap} relative`}>
        <Reveal>
          <p className="mb-6 font-mono text-[11px] tracking-[0.4em] text-volt">01 / BRAND</p>
          <h2 className="metal max-w-5xl font-display text-[clamp(2.2rem,8vw,6.5rem)] font-black uppercase leading-[0.98]">{h.headline}</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-silver/85 sm:text-xl">{h.subheadline}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={h.primaryCta.href}>{h.primaryCta.label}</Button>
            <Button href={h.secondaryCta.href} variant="ghost">{h.secondaryCta.label}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  return (
    <section className="bg-void py-24 sm:py-32">
      <div className={wrap}>
        <Reveal><SectionHeading eyebrow="02 / SERVICES" title="What we build" text="From focused business sites to custom applications and AI features." /></Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-silver/10 bg-silver/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="group relative bg-void p-7 transition hover:bg-graphite">
              <ServiceIcon name={s.icon} className="h-7 w-7 text-volt" />
              <h3 className="mt-5 font-display text-base font-bold uppercase leading-snug text-chrome">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver/70">{s.short}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-silver/30 transition group-hover:text-volt" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  return (
    <section className="bg-coal py-24 sm:py-32">
      <div className={wrap}>
        <Reveal><SectionHeading eyebrow="03 / OUR WORK" title="Featured projects" text="Demonstrations and in-progress builds are clearly labelled. We only list real client work once it exists." /></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group overflow-hidden rounded-2xl hairline bg-graphite/60 transition hover:border-volt/50">
              <div className="relative aspect-[8/5] overflow-hidden">
                <Image src={p.cover} alt={`${p.title} cover`} fill unoptimized sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <StatusBadge status={p.status} />
                <h3 className="mt-3 font-display text-lg font-bold uppercase text-chrome">{p.title}</h3>
                <p className="mt-2 text-sm text-silver/70">{p.category}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10"><Button href="/portfolio" variant="ghost">VIEW ALL WORK</Button></div>
      </div>
    </section>
  );
}

export function AboutBrief() {
  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-32">
      <div className="absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-crimson/10 blur-[120px]" aria-hidden />
      <div className={`${wrap} relative grid gap-12 lg:grid-cols-2`}>
        <Reveal><SectionHeading eyebrow="04 / ABOUT" title={about.headline} /></Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-silver/80 sm:text-lg">
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <Link href="/about" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-volt hover:text-white">MORE ABOUT US <ArrowUpRight size={14} /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="bg-coal py-24 sm:py-32">
      <div className={wrap}>
        <Reveal><SectionHeading eyebrow="05 / WHY US" title="Why choose HUMAN ERROR" /></Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl hairline p-6">
                <span className="font-mono text-xs text-crimson">0{i + 1}</span>
                <h3 className="mt-4 font-display text-base font-bold uppercase text-chrome">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver/70">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-void py-24 sm:py-32">
      <div className={wrap}>
        <Reveal><SectionHeading eyebrow="06 / PROCESS" title="How we work" /></Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-silver/10 bg-silver/10 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((s) => (
            <li key={s.step} className="bg-void p-7">
              <span className="font-display text-4xl font-black text-silver/15">{s.step}</span>
              <h3 className="mt-3 font-display text-base font-bold uppercase text-chrome">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AIStudioIntro() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-coal to-void py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt to-transparent" aria-hidden />
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
        <Reveal>
          <SectionHeading eyebrow="07 / AI STUDIO" title="AI video studio" text="A workspace for text-to-video, image-to-video, advertisements and social clips. Live generation is available once a video provider is connected; until then the studio runs in a clearly labelled demo mode." />
          <div className="mt-8"><Button href="/ai-studio"><Sparkles size={16} /> OPEN AI STUDIO</Button></div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl hairline bg-void/70 p-6 font-mono text-xs leading-7 text-silver/70">
            <p className="text-volt">$ prompt</p>
            <p className="text-chrome">&ldquo;A lone figure walks through a server hall lit in cold blue…&rdquo;</p>
            <p className="mt-3 text-volt">$ mode · aspect · duration · quality</p>
            <p>text-to-video · 16:9 · 8s · high</p>
            <p className="mt-3 text-crimson">$ status: connect a provider to go live</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PricingPreview() {
  return (
    <section className="bg-void py-24 sm:py-32">
      <div className={wrap}>
        <Reveal><SectionHeading eyebrow="08 / PRICING" title="Packages" text="Every project is quoted in writing before work starts." /></Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <div key={p.id} className={`flex flex-col rounded-2xl p-6 ${p.highlighted ? "border border-volt/60 bg-graphite shadow-[0_0_60px_-20px_#2d7bff]" : "hairline bg-graphite/40"}`}>
              <h3 className="font-display text-base font-bold uppercase text-chrome">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-silver/70">{p.summary}</p>
              <p className="mt-6 font-mono text-sm text-chrome">{formatPrice(p.price, p.currency)}</p>
              <Button href={`/contact?service=${encodeURIComponent("Pricing / custom quote")}`} variant="ghost" className="mt-5">ENQUIRE</Button>
            </div>
          ))}
        </div>
        <div className="mt-10"><Button href="/pricing" variant="ghost">FULL PRICING DETAILS</Button></div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="bg-coal py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.4fr]`}>
        <Reveal><SectionHeading eyebrow="09 / FAQ" title="Questions" /></Reveal>
        <div className="divide-y divide-silver/10 border-y border-silver/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-bold uppercase text-chrome sm:text-base">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-volt transition group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-silver/75 sm:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-void py-28 text-center sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(45,123,255,0.25),transparent_60%)]" aria-hidden />
      <div className={`${wrap} relative`}>
        <Reveal>
          <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-volt">10 / CONTACT</p>
          <h2 className="metal mx-auto max-w-4xl font-display text-4xl font-black uppercase leading-tight sm:text-6xl">Have a project in mind?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-silver/80">Tell us what you want to build. We will reply with next steps and a custom quote.</p>
          <div className="mt-10"><Button href="/contact">START YOUR PROJECT</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
