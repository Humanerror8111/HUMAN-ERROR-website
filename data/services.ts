import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "business-website",
    title: "Business Website Development",
    icon: "globe",
    short: "Fast, credible websites that present your business and turn visitors into enquiries.",
    description:
      "A professional website built around your offer, your audience and your goals. Clear structure, strong messaging and a design that earns trust at first glance.",
    features: ["Custom responsive design", "Service and contact pages", "SEO-ready structure", "Enquiry form with spam protection", "Analytics-ready setup"],
    benefits: ["A credible online presence", "Easier for customers to contact you", "Foundation you can grow on"],
  },
  {
    slug: "ecommerce-website",
    title: "E-commerce Website Development",
    icon: "cart",
    short: "Online stores with clear product journeys and a checkout your customers can trust.",
    description:
      "Product catalogues, carts and checkout built on proven commerce tooling, shaped around how your customers actually shop.",
    features: ["Product catalogue and search", "Cart and checkout integration", "Payment provider integration", "Order management workflow", "Mobile-first shopping experience"],
    benefits: ["Sell around the clock", "Manage products without code", "Smooth mobile purchasing"],
  },
  {
    slug: "school-website",
    title: "School Website Development",
    icon: "school",
    short: "Clear, accessible websites for schools and educational institutions.",
    description:
      "Websites that give parents, students and staff the information they need: notices, admissions, academics, events and contact details, all easy to update.",
    features: ["Notices and announcements", "Admissions information", "Gallery and events", "Staff and department pages", "Easy content updates"],
    benefits: ["Better communication with families", "Accessible to every device", "Simple for staff to maintain"],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website Development",
    icon: "user",
    short: "Distinctive personal-brand and creator sites that showcase your work.",
    description:
      "A site that makes your work the star. Ideal for creators, freelancers, photographers, designers and personal brands.",
    features: ["Project showcase with case studies", "Video and image galleries", "About and contact sections", "Social media integration", "Fast loading media"],
    benefits: ["Stand out from template portfolios", "Share one link everywhere", "Present your work professionally"],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    icon: "code",
    short: "Tailor-made web apps, dashboards and platforms for your specific workflow.",
    description:
      "When off-the-shelf tools do not fit, we design and build secure, maintainable applications with the features your process needs.",
    features: ["User accounts and roles", "Database-backed features", "Dashboards and admin tools", "API integrations", "Secure architecture"],
    benefits: ["Software that fits how you work", "Own your platform", "Room to scale features over time"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "pen",
    short: "Interface and experience design that is clear, usable and distinctive.",
    description:
      "Research-informed layouts, flows and visual systems that make products easy to use and memorable to look at.",
    features: ["User flows and wireframes", "Visual design systems", "Interactive prototypes", "Accessibility review", "Design hand-off for development"],
    benefits: ["Fewer usability problems", "Consistent brand experience", "Faster development"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    icon: "brain",
    short: "Practical AI features added to your website or product.",
    description:
      "Chat assistants, content tools, search and generation features connected securely to real AI providers, scoped to what is genuinely useful for your users.",
    features: ["Provider-independent integration", "Secure server-side API handling", "Usage limits and cost controls", "Prompt and workflow design", "Monitoring and error handling"],
    benefits: ["Useful automation for your users", "Controlled costs", "No vendor lock-in"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    icon: "refresh",
    short: "Modernise an existing site: look, speed, structure and conversion.",
    description:
      "We review what you have, keep what works and rebuild what does not: cleaner design, better performance and clearer calls to action.",
    features: ["Site and content audit", "New design and structure", "Performance improvements", "Content migration", "SEO continuity planning"],
    benefits: ["A fresher, more trustworthy look", "Faster pages", "Clearer paths to enquiry"],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    icon: "wrench",
    short: "Ongoing updates, fixes and improvements so your site stays healthy.",
    description:
      "Regular updates, content changes, dependency upgrades and small improvements, handled so you can focus on your work.",
    features: ["Content updates", "Dependency and security updates", "Bug fixes", "Performance checks", "Small feature additions"],
    benefits: ["A site that stays current", "One contact for changes", "Fewer surprises"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    icon: "workflow",
    short: "Connect forms, spreadsheets, email and tools so routine work runs itself.",
    description:
      "We map repetitive processes and automate them: enquiries routed to the right place, documents generated, notifications sent.",
    features: ["Workflow mapping", "Form-to-email and CRM routing", "Spreadsheet and database sync", "Notifications and reports", "Custom integrations"],
    benefits: ["Less manual work", "Fewer mistakes", "Faster response to customers"],
  },
  {
    slug: "digital-solutions",
    title: "Digital Solutions",
    icon: "layers",
    short: "Not sure what you need? We help define the right digital solution.",
    description:
      "Tell us the problem. We will help you scope the right combination of website, application, automation or AI so you invest in what matters.",
    features: ["Discovery conversation", "Scope and recommendation", "Phased delivery plan", "Technology guidance", "Custom quote"],
    benefits: ["Clarity before spending", "A realistic roadmap", "One partner for the whole solution"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
