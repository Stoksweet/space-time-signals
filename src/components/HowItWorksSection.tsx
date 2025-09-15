import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  MapPin, 
  BarChart3, 
  Plug, 
  CheckCircle, 
  DollarSign,
  ArrowRight
} from "lucide-react";

export const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<'advertiser' | 'owner'>('advertiser');

  const advertiserSteps = [
    {
      icon: PenTool,
      title: "Create Your Offer",
      description: "Design your ad in minutes with our simple tools, or upload your own creative.",
      details: "No design experience? No problem. Our templates make professional ads effortless."
    },
    {
      icon: MapPin,
      title: "Select Location & Time",
      description: "Choose which venues and time slots match your target audience perfectly.",
      details: "Morning coffee crowd? Lunch rush? Evening gym-goers? Pick your moments."
    },
    {
      icon: BarChart3,
      title: "See Real Results",
      description: "Track impressions, engagement, and ROI with detailed analytics.",
      details: "Unlike traditional OOH, you'll know exactly how your ads perform."
    }
  ];

  const ownerSteps = [
    {
      icon: Plug,
      title: "Plug In & Go",
      description: "Connect your smart TV or display to our network in under 5 minutes.",
      details: "Simple setup, no technical expertise required. We handle the rest."
    },
    {
      icon: CheckCircle,
      title: "Approve Quality Ads",
      description: "Review and approve ads that fit your venue's atmosphere and audience.",
      details: "You maintain full control over what displays in your space."
    },
    {
      icon: DollarSign,
      title: "Get Paid Monthly",
      description: "Earn passive income from your screens with transparent, fair revenue sharing.",
      details: "Turn your displays into profit centers while enhancing customer experience."
    }
  ];

  const steps = activeTab === 'advertiser' ? advertiserSteps : ownerSteps;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              ridiculously simple
            </span>{" "}
            it is
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've eliminated the pain from out-of-home advertising. 
            No agencies, no minimums, no hassle.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-background rounded-lg p-1 shadow-sm border">
            <Button
              variant={activeTab === 'advertiser' ? 'default' : 'ghost'}
              className="px-6 py-3"
              onClick={() => setActiveTab('advertiser')}
            >
              I want to advertise
            </Button>
            <Button
              variant={activeTab === 'owner' ? 'default' : 'ghost'}
              className="px-6 py-3"
              onClick={() => setActiveTab('owner')}
            >
              I own a venue
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="mb-4">
                    Step {index + 1}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <p className="text-sm text-primary font-medium">{step.details}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            {activeTab === 'advertiser' 
              ? "Ready to reach customers where they actually pay attention?" 
              : "Ready to monetize your screens and delight customers?"
            }
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            <a 
              href="https://chat.whatsapp.com/DTNYomQrONj2rKRQnbWKIp" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};