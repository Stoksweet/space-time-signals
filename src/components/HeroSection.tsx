import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { TVScreensBackground } from "./TVScreensBackground";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
      {/* 3D TV Screens Background */}
      <TVScreensBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Spell Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="h-8 w-8 text-st-blue/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-1000">
          <Zap className="h-6 w-6 text-st-green/20" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float animation-delay-2000">
          <Sparkles className="h-10 w-10 text-st-yellow/20" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float animation-delay-500">
          <Zap className="h-7 w-7 text-st-red/20" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-st-blue/10 rounded-full blur-xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-st-green/10 rounded-full blur-xl animate-glow-pulse animation-delay-1500"></div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hook Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in text-white">
            Attention is modern{" "}
            <span className="text-transparent bg-gradient-spell bg-clip-text animate-spell-cast bg-[length:200%_200%] inline-block">
              gold
            </span>
            . We help you mint it.
          </h1>

          {/* Subheadline */}
          <div className="space-y-4 animate-fade-in-delayed">
            <p className="text-2xl md:text-3xl text-gray-200 font-medium">
              Your ads on Smart TVs — everywhere people look but never expect.
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              Turn idle screens into earning machines.
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              Create, launch, and earn from campaigns in minutes.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-8 animate-scale-in animation-delay-600 flex flex-col gap-4 items-center">
            <Button 
              asChild
              size="lg" 
              className="text-lg px-8 py-4 bg-st-green hover:bg-st-green/90 text-white shadow-glow transform hover:scale-105 transition-all duration-300 hover:shadow-spell group"
            >
              <a 
                href="https://app.spacetimeadvertising.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Start Your Campaign
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              asChild
              size="lg"
              className="text-lg px-8 py-4 bg-white/95 text-gray-900 hover:bg-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
            >
              <a 
                href="https://chat.whatsapp.com/DTNYomQrONj2rKRQnbWKIp"
                target="_blank"
                rel="noopener noreferrer"
              >
                I Own a Venue
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};