import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Our Work", description: "Projects and demonstrations from HUMAN ERROR." };

export default function PortfolioPage() {
  return (
    <main id="main">
      <PageHero eyebrow="OUR WORK" title="Projects & demonstrations" text="Everything here is labelled honestly. Demonstrations are not client work. Edit projects in data/projects.ts." />
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"><ProjectGrid projects={projects} /></div>
    </main>
  );
}
