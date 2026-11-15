import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { emailLink, siteConfig, whatsappLink } from "@/data/site-config";

export const metadata: Metadata = { title: "Contact", description: "Start your project with HUMAN ERROR." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const email = emailLink();
  const wa = whatsappLink();
  return (
    <main id="main">
      <PageHero eyebrow="CONTACT" title="Start your project" text="Tell us about your idea. The more detail you share, the better our reply." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <EnquiryForm initialService={service} />
        <aside className="space-y-4">
          <h2 className="font-mono text-[11px] tracking-[0.3em] text-volt">OR REACH US DIRECTLY</h2>
          {email && <a href={email} className="flex min-h-[56px] items-center gap-3 rounded-xl hairline p-4 text-chrome hover:border-volt"><Mail className="h-5 w-5 text-volt" aria-hidden />{siteConfig.contact.email}</a>}
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-[56px] items-center gap-3 rounded-xl hairline p-4 text-chrome hover:border-volt"><MessageCircle className="h-5 w-5 text-volt" aria-hidden />WhatsApp</a>}
          {!email && !wa && <p className="rounded-xl hairline p-4 text-sm text-silver/70">Direct contact links appear here once you add your email and WhatsApp number in <code className="font-mono text-xs">data/site-config.ts</code>.</p>}
        </aside>
      </div>
    </main>
  );
}
