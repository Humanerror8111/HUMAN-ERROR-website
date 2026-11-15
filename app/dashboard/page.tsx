import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

const panels = ["Credit balance", "Generation history", "Saved projects", "Usage history"];

export default function DashboardPage() {
  return (
    <main id="main">
      <PageHero eyebrow="DASHBOARD" title="Customer dashboard (not connected)" text="This is the planned layout. Without an authentication provider and database, there is no data to show." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-24 sm:grid-cols-2 sm:px-6 lg:px-8">
        {panels.map((p) => (
          <div key={p} className="rounded-2xl hairline p-8"><h2 className="font-display text-lg font-bold uppercase text-chrome">{p}</h2><p className="mt-2 font-mono text-xs tracking-[0.2em] text-silver/50">NO DATA. ACCOUNTS NOT CONNECTED</p></div>
        ))}
      </div>
    </main>
  );
}
