import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hook Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Visibility is a{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              spell
            </span>
            . Cast it often.
          </h1>

          {/* Subheadline */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              Smart TV billboards make your brand unmissable — turning fleeting attention into lasting memory.
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Familiarity isn't bought, it's built. Start building today.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-8">
            <Button 
              asChild
              size="lg" 
              className="text-lg px-8 py-4 bg-green-500 hover:bg-green-600 text-white shadow-brand transform hover:scale-105 transition-all duration-200"
            >
              <a 
                href="https://app.spacetimeadvertising.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                👉 Start Your Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};