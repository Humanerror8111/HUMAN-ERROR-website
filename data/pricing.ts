import type { PricingPackage, CreditPlan } from "@/types";

/**
 * Prices are intentionally empty (null) until YOU decide them.
 * Set `price` to a number, for example 499, and the site will show it.
 * Nothing here is a guarantee, warranty or delivery promise.
 */
export const packages: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: null,
    currency: "USD",
    summary: "A clean, focused site to get you online.",
    included: ["Up to a few pages", "Responsive design", "Contact / enquiry form", "Basic SEO setup"],
    useCases: ["New businesses", "Personal brands", "Simple information sites"],
    addOns: ["Extra pages", "Copywriting", "Domain and hosting setup"],
    cta: "Enquire about Starter",
  },
  {
    id: "professional",
    name: "Professional Website",
    price: null,
    currency: "USD",
    summary: "A complete business site with room to grow.",
    included: ["Custom multi-page design", "Services and portfolio sections", "Enquiry system", "SEO and performance setup", "Editable content files"],
    useCases: ["Established businesses", "Schools", "Creators and freelancers"],
    addOns: ["Blog", "Multilingual pages", "Analytics setup", "Maintenance plan"],
    cta: "Enquire about Professional",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium Website",
    price: null,
    currency: "USD",
    summary: "Brand-led design with advanced interaction and motion.",
    included: ["Bespoke visual identity direction", "Advanced animation and interaction", "Portfolio / case-study system", "Integrations as required", "Performance and accessibility pass"],
    useCases: ["Brands that need to stand out", "Agencies and studios", "Product launches"],
    addOns: ["3D / video experiences", "AI features", "E-commerce", "Maintenance plan"],
    cta: "Enquire about Premium",
  },
  {
    id: "custom-app",
    name: "Custom Web Application",
    price: null,
    currency: "USD",
    priceNote: "Scoped individually",
    summary: "Software built for your specific workflow.",
    included: ["Discovery and scoping", "Accounts and roles as required", "Database and API design", "Admin tooling", "Phased delivery"],
    useCases: ["Dashboards and portals", "Booking and management systems", "AI-powered tools"],
    addOns: ["Payment integration", "Third-party integrations", "Ongoing development"],
    cta: "Request a custom quote",
  },
];

export const customQuote = {
  title: "Need something different?",
  text: "Tell us what you are building and we will prepare a custom quote. Pricing is confirmed in writing before any work begins.",
};

/** Future-ready AI Studio credit plans. `enabled: false` hides purchase actions. */
export const aiCreditConfig = {
  enabled: false,
  note: "Credit packs are not on sale yet. Payment integration is a future step.",
  plans: [
    { id: "credits-small", name: "Starter Credits", credits: null, price: null, currency: "USD", note: "To be configured" },
    { id: "credits-medium", name: "Creator Credits", credits: null, price: null, currency: "USD", note: "To be configured" },
    { id: "credits-large", name: "Studio Credits", credits: null, price: null, currency: "USD", note: "To be configured" },
  ] as CreditPlan[],
};

export function formatPrice(price: number | null, currency: string): string {
  if (price === null) return "Quote on request";
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}
