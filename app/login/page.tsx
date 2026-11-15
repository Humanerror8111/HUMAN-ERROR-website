import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Customer Login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main id="main">
      <PageHero eyebrow="ACCOUNTS" title="Customer accounts: not active yet" text="Registration, login, credits and history are architecture-ready (see types/index.ts and the README) but no authentication provider is connected, so no account can be created. We do not simulate sign-ups or payments." />
    </main>
  );
}
