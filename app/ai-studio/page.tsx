import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Workspace } from "@/components/ai-studio/Workspace";

export const metadata: Metadata = { title: "AI Studio", description: "AI video generation workspace: text-to-video, image-to-video, adverts and social clips." };

export default function AIStudioPage() {
  return (
    <main id="main">
      <PageHero eyebrow="AI STUDIO" title="AI video studio" text="Frontend → secure backend → video provider → generation job → preview. Keys never reach the browser." />
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"><Workspace /></div>
    </main>
  );
}
