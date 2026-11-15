import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { siteConfig } from "@/data/site-config";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["400", "700", "800", "900"], display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "HUMAN ERROR | Digital Studio & AI Creative Platform", template: "%s | HUMAN ERROR" },
  description: siteConfig.description,
  openGraph: { title: "HUMAN ERROR", description: siteConfig.description, type: "website", siteName: "HUMAN ERROR" },
  twitter: { card: "summary_large_image", title: "HUMAN ERROR", description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050507", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only z-[60] rounded bg-chrome px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}