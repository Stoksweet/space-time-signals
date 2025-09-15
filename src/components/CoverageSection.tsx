import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Users, TrendingUp, MessageCircle } from "lucide-react";

export const CoverageSection = () => {
  const stats = [
    { icon: Building, label: "Sites", value: "50 (Pending)", color: "text-st-blue" },
    { icon: MapPin, label: "Towns", value: "3", color: "text-st-red", subtitle: "Sea Point, Green Point, Cape Town CBD" },
    { icon: Users, label: "Daily Reach", value: "up to 15K+", color: "text-st-yellow" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Covering the city,{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              one screen at a time
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our network spans cafes, gyms, salons, and waiting areas where your customers 
            actually spend time — not speeding past on highways.
          </p>
        </div>

        {/* WhatsApp Community CTA */}
        <div className="mb-16">
          <Card className="p-12 bg-slate-900 border-0 shadow-brand text-center">
            <MessageCircle className="h-20 w-20 mx-auto mb-6 text-green-400" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              Connect with fellow advertisers, share insights, and stay updated on new venue additions and advertising opportunities.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <a 
                href="https://chat.whatsapp.com/DTNYomQrONj2rKRQnbWKIp" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join our WhatsApp community
              </a>
            </Button>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              {stat.subtitle && (
                <div className="text-xs text-muted-foreground mt-2 max-w-48 mx-auto">
                  {stat.subtitle}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Growing Note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Growing every week</span>
          </div>
        </div>
      </div>
    </section>
  );
};