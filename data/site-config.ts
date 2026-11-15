/**
 * Central site configuration. Edit freely: no component needs to change.
 * Anything left empty ("") is hidden from the UI rather than shown broken.
 */
export const siteConfig = {
  name: "HUMAN ERROR",
  tagline: "We build the digital future.",
  description:
    "HUMAN ERROR is a digital technology and creative studio: websites, web applications, AI integration and an AI video studio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    email: "", // e.g. "hello@yourdomain.com"
    whatsappNumber: "", // international format, digits only, e.g. "919876543210"
    whatsappMessage: "Hello HUMAN ERROR, I would like to discuss a project.",
    location: "",
  },

  social: {
    instagram: "",
    youtube: "",
    github: "",
    linkedin: "",
    x: "",
  },

  nav: [
    { label: "HOME", href: "/" },
    { label: "SERVICES", href: "/services" },
    { label: "OUR WORK", href: "/portfolio" },
    { label: "AI STUDIO", href: "/ai-studio" },
    { label: "ABOUT", href: "/about" },
    { label: "PRICING", href: "/pricing" },
    { label: "CONTACT", href: "/contact" },
  ],

  home: {
    headline: "WE BUILD THE DIGITAL FUTURE.",
    subheadline:
      "We transform ambitious ideas into powerful websites, intelligent applications and extraordinary digital experiences.",
    primaryCta: { label: "START YOUR PROJECT", href: "/contact" },
    secondaryCta: { label: "EXPLORE OUR WORK", href: "/portfolio" },
  },

  budgetRanges: ["Not sure yet", "Under 500", "500 – 1,500", "1,500 – 5,000", "5,000+"],
  budgetCurrencyNote: "Amounts are indicative; choose the closest range in your currency.",
} as const;

export function whatsappLink(): string | null {
  const { whatsappNumber, whatsappMessage } = siteConfig.contact;
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}

export function emailLink(): string | null {
  return siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null;
}
