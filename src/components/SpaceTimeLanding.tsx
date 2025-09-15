import { HeroSection } from "./HeroSection";
import { CoverageSection } from "./CoverageSection";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { Footer } from "./Footer";

export const SpaceTimeLanding = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <CoverageSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
};