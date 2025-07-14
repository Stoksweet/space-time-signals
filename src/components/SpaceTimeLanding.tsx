import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { CoverageSection } from "./CoverageSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { SignupForm } from "./SignupForm";
import { Footer } from "./Footer";

export const SpaceTimeLanding = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleJoinWaitlist = () => {
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onJoinWaitlist={handleJoinWaitlist} />
      <CoverageSection />
      <HowItWorksSection />
      <Footer />
      
      <SignupForm 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </div>
  );
};