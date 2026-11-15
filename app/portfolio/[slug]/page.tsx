import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/portfolio/StatusBadge";
import { getProject, projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const cs = p.caseStudy;
  return (
    <main id="main">
      <PageHero eyebrow={p.category.toUpperCase()} title={p.title} text={p.description} />
      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-4"><StatusBadge status={p.status} /><span className="font-mono text-[11px] tracking-[0.2em] text-silver/60">{p.technologies.join(" · ")}</span></div>
        <div className="relative aspect-[8/5] overflow-hidden rounded-2xl hairline">
          <Image src={p.cover} alt={`${p.title} cover`} fill unoptimized priority sizes="(min-width:1024px) 1000px, 100vw" className="object-cover" />
        </div>
        {p.video && <video className="mt-6 w-full rounded-2xl hairline" src={p.video} controls playsInline preload="metadata" />}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {([["Challenge", cs.challenge], ["Approach", cs.approach], ["Outcome", cs.outcome]] as const).map(([t, body]) => (
            <div key={t}><h2 className="font-mono text-[11px] tracking-[0.3em] text-volt">{t.toUpperCase()}</h2><p className="mt-3 leading-relaxed text-silver/80">{body}</p></div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {p.liveUrl && <Button href={p.liveUrl} external={/^https?:/.test(p.liveUrl)}>VISIT LIVE <ArrowUpRight size={14} /></Button>}
          <Button href="/contact" variant="ghost">START A SIMILAR PROJECT</Button>
          <Link href="/portfolio" className="inline-flex min-h-[48px] items-center font-mono text-xs tracking-[0.2em] text-silver/70 hover:text-white">← ALL WORK</Link>
        </div>
      </div>
    </main>
  );
}
