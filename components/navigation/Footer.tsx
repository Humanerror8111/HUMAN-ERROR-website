import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { siteConfig, emailLink, whatsappLink } from "@/data/site-config";

export function Footer() {
  const email = emailLink();
  const wa = whatsappLink();
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v);
  return (
    <footer className="relative border-t border-silver/10 bg-coal">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver/70">{siteConfig.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-volt">EXPLORE</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {siteConfig.nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-silver/70 hover:text-white">{n.label[0] + n.label.slice(1).toLowerCase()}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-volt">CONTACT</p>
          <ul className="space-y-2 text-sm text-silver/70">
            {email && <li><a className="hover:text-white" href={email}>{siteConfig.contact.email}</a></li>}
            {wa && <li><a className="hover:text-white" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            {!email && !wa && <li>Add your email and WhatsApp in <code className="font-mono text-xs text-silver">data/site-config.ts</code>.</li>}
            <li><Link className="hover:text-white" href="/contact">Project enquiry form</Link></li>
            {socials.map(([k, v]) => (
              <li key={k}><a className="capitalize hover:text-white" href={v} target="_blank" rel="noopener noreferrer">{k}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-silver/10 py-5 text-center font-mono text-[10px] tracking-[0.25em] text-silver/40">
        © {new Date().getFullYear()} HUMAN ERROR. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
