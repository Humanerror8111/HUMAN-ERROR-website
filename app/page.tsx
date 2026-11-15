import { IntroSequence } from "@/components/cinematic/IntroSequence";
import { MainHero, ServicesOverview, FeaturedProjects, AboutBrief, WhyChooseUs, ProcessSection, AIStudioIntro, PricingPreview, FAQSection, ContactCTA } from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <main>
      <IntroSequence />
      <div id="main">
        <MainHero />
        <ServicesOverview />
        <FeaturedProjects />
        <AboutBrief />
        <WhyChooseUs />
        <ProcessSection />
        <AIStudioIntro />
        <PricingPreview />
        <FAQSection />
        <ContactCTA />
      </div>
    </main>
  );
}
