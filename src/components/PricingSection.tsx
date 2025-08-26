import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Target, BarChart3 } from "lucide-react";

export const PricingSection = () => {
  const slotPackages = [
    {
      name: "Starter",
      slots: "360 slots",
      cost: "R1000",
      notes: "Includes campaign creation fee",
      popular: false,
    },
    {
      name: "Growth",
      slots: "720 slots",
      cost: "R2000",
      notes: "Save on additional campaigns",
      popular: true,
    },
    {
      name: "Scale",
      slots: "1080+ slots",
      cost: "Custom",
      notes: "Tailored pricing for large campaigns",
      popular: false,
    },
  ];

  const conversionFeatures = [
    {
      icon: Target,
      feature: "QR Code Scans (PPQR)",
      model: "Pay-per-QR",
      rate: "5%",
      condition: "avg. item < R1000",
    },
    {
      icon: Zap,
      feature: "Website Clicks (PPC)",
      model: "Pay-per-click",
      rate: "5%",
      condition: "avg. item < R1000",
    },
    {
      icon: BarChart3,
      feature: "Promo Codes Used (PPPC)",
      model: "Pay-per-promo-code",
      rate: "5%",
      condition: "avg. item < R1000",
    },
    {
      icon: Star,
      feature: "High-Value Campaigns",
      model: "Dynamic Rate",
      rate: "Auto-generated",
      condition: "≥ R1000 item cost + negotiable",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple,{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              transparent pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay for what you use with our slot-based system, plus optional performance tracking 
            for maximum ROI on your advertising spend.
          </p>
        </div>

        {/* Model 1: Slot-Based Pricing */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Slot-Based Pricing</h3>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-primary">R2 per 60-second slot</span> • Minimum Package: 360 slots = R1000
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {slotPackages.map((pkg, index) => (
              <Card key={index} className={`p-6 relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-bold">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-primary">{pkg.cost}</div>
                  <div className="text-muted-foreground">{pkg.slots}</div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-st-green" />
                      <span>{pkg.notes}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Model 2: Commission on Conversion */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Commission on Conversion</h3>
            <p className="text-lg text-muted-foreground">
              Applied in addition to slot-based pricing • Tracked via platform analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {conversionFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <h5 className="font-semibold text-sm">{feature.feature}</h5>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {feature.model}
                    </div>
                    <div className="text-xl font-bold text-primary">{feature.rate}</div>
                    <div className="text-xs text-muted-foreground">{feature.condition}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};