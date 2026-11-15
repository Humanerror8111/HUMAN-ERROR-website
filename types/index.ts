export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  benefits: string[];
  icon: "globe" | "cart" | "school" | "user" | "code" | "pen" | "brain" | "refresh" | "wrench" | "workflow" | "layers";
};

export type ProjectStatus = "demonstration" | "in-progress" | "completed" | "concept";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  cover: string; // path under /public
  video?: string; // optional path or URL
  technologies: string[];
  liveUrl?: string;
  status: ProjectStatus;
  caseStudy: { challenge: string; approach: string; outcome: string };
};

export type PricingPackage = {
  id: string;
  name: string;
  /** null = no public price; the UI shows "Quote on request". Set a number to show a price. */
  price: number | null;
  currency: string;
  priceNote?: string;
  summary: string;
  included: string[];
  useCases: string[];
  addOns: string[];
  cta: string;
  highlighted?: boolean;
};

export type CreditPlan = {
  id: string;
  name: string;
  credits: number | null;
  price: number | null;
  currency: string;
  note: string;
};

export type VideoMode = "text-to-video" | "image-to-video" | "ad-video" | "cinematic" | "social";

export type GenerationRequest = {
  mode: VideoMode;
  prompt: string;
  aspectRatio: "16:9" | "9:16" | "1:1";
  duration: number;
  quality: "standard" | "high";
  style: string;
  imageDataUrl?: string;
};

export type GenerationJob = {
  id: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  progress?: number;
  videoUrl?: string;
  error?: string;
};

/** Prepared shapes for future accounts / credits (no auth is active yet). */
export type CustomerAccount = { id: string; email: string; credits: number; createdAt: string };
export type UsageEntry = { id: string; accountId: string; jobId: string; creditsUsed: number; createdAt: string };
