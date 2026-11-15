import type { Project } from "@/types";

/**
 * Add, edit or delete projects here.
 * Rules: only list real work as "completed". Concepts and demos MUST use the
 * "demonstration" or "concept" status so they are clearly labelled on the site.
 */
export const projects: Project[] = [
  {
    slug: "demo-school-website",
    title: "School Website Concept",
    category: "School Website",
    status: "demonstration",
    description:
      "A demonstration layout for a school website: notices, admissions, events and staff pages. Built to show our approach, not for a real client.",
    cover: "/images/projects/demo-school.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    caseStudy: {
      challenge: "Schools need to publish information quickly, and families need to find it without searching.",
      approach: "A notice-first homepage, clear admissions path and a content structure that non-technical staff can update.",
      outcome: "Demonstration only. No real institution or measurable results are implied.",
    },
  },
  {
    slug: "demo-storefront",
    title: "Boutique Storefront Concept",
    category: "E-commerce",
    status: "demonstration",
    description:
      "A demonstration storefront showing product pages, cart flow and mobile shopping. Not a live shop.",
    cover: "/images/projects/demo-store.svg",
    technologies: ["Next.js", "TypeScript", "Stripe (not connected)"],
    caseStudy: {
      challenge: "Small shops need a storefront that feels premium without a heavy platform.",
      approach: "Editorial product pages with a lightweight cart and a payment provider hook.",
      outcome: "Demonstration only. Payments are not connected.",
    },
  },
  {
    slug: "demo-ai-studio",
    title: "AI Studio Interface",
    category: "AI Integration",
    status: "in-progress",
    description:
      "The AI Video Studio on this site: a provider-independent workspace for text-to-video and image-to-video generation.",
    cover: "/images/projects/demo-ai.svg",
    liveUrl: "/ai-studio",
    technologies: ["Next.js", "Server-side API routes", "Provider adapters"],
    caseStudy: {
      challenge: "Video generation APIs differ, cost money per run and take time to finish.",
      approach: "Asynchronous jobs, polling, rate limits and a provider adapter layer, with a clearly labelled demo mode when nothing is connected.",
      outcome: "Live generation requires you to connect a provider in your own environment settings.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
