import { Card } from "@/components/ui/card";
import { MapPin, Monitor, Building, Users, Calendar, TrendingUp } from "lucide-react";

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

        {/* Map Placeholder - In real implementation, this would be an interactive map */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-hero border-0 shadow-brand">
            <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-2xl font-semibold">Interactive Coverage Map</h3>
                <p className="text-muted-foreground max-w-md">
                  Dynamic map showing real-time venue locations, screen availability, 
                  and coverage areas across the city
                </p>
              </div>
            </div>
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