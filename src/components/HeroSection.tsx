import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <img 
          src="/lovable-uploads/dad7dc46-c8e6-4569-8adf-de90c87a4fe3.png" 
          alt="" 
          className="w-[800px] h-[800px] object-contain"
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/dad7dc46-c8e6-4569-8adf-de90c87a4fe3.png" 
              alt="Space Time Advertising" 
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>

          {/* Hook Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            If people don't see your{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              offer
            </span>
            , did it even happen?
          </h1>

          {/* Subheadline */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              Big brands have billboards. Now you do too.
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Space Time turns TVs in cafes, gyms, and salons into your personal ad network.
            </p>
          </div>

          {/* Supporting Statement */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Out-of-home advertising is no longer out of reach. We're democratizing smart TV advertising 
            for local businesses — making it affordable, instant, and actually effective.
          </p>

          {/* Primary CTA */}
          <div className="pt-8">
            <Button 
              asChild
              size="lg" 
              className="text-lg px-8 py-4 bg-green-500 hover:bg-green-600 text-white shadow-brand transform hover:scale-105 transition-all duration-200"
            >
              <a 
                href="https://chat.whatsapp.com/DTNYomQrONj2rKRQnbWKIp" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join our WhatsApp community
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