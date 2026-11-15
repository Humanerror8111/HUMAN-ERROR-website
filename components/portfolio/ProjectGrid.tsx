"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utilities/cn";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("min-h-[44px] rounded-full border px-5 font-mono text-[11px] tracking-[0.2em] transition", cat === c ? "border-volt bg-volt/10 text-white" : "border-silver/20 text-silver/70 hover:text-white")}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group overflow-hidden rounded-2xl hairline bg-graphite/50 transition hover:border-volt/50">
            <div className="relative aspect-[8/5] overflow-hidden">
              <Image src={p.cover} alt={`${p.title} cover`} fill unoptimized sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <StatusBadge status={p.status} />
              <h2 className="mt-3 font-display text-lg font-bold uppercase text-chrome">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-silver/70">{p.description}</p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-silver/50">{p.technologies.join(" · ")}</p>
            </div>
          </Link>
        ))}
      </div>
      {shown.length === 0 && <p className="text-silver/60">No projects in this category yet.</p>}
    </>
  );
}
