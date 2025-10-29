import {
  Shield,
  DollarSign,
  Clock,
  Smartphone,
  Users,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "All drivers are verified and background-checked. Your safety is our priority.",
    details:
      "24/7 monitoring, emergency assistance, and comprehensive insurance coverage.",
    gradient: "from-blue-500 to-blue-600",
    badge: "Security",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent pricing with no hidden fees. Pay only for what you ride.",
    details:
      "Upfront pricing, multiple payment options, and special discounts for frequent riders.",
    gradient: "from-green-500 to-emerald-600",
    badge: "Value",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Get a ride anytime, anywhere. We're always here when you need us.",
    details:
      "Round-the-clock service in all major cities with quick pickup times.",
    gradient: "from-purple-500 to-purple-600",
    badge: "Convenience",
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description:
      "Book a ride in seconds with our intuitive app. Simple and hassle-free.",
    details:
      "Smart matching algorithm, real-time tracking, and in-app communication.",
    gradient: "from-pink-500 to-pink-600",
    badge: "Simplicity",
  },
  {
    icon: Users,
    title: "Share & Save",
    description:
      "Split rides with others and save money while making new friends.",
    details:
      "Eco-friendly carpooling, reduced costs, and meet like-minded commuters.",
    gradient: "from-orange-500 to-orange-600",
    badge: "Social",
  },
  {
    icon: Award,
    title: "Premium Service",
    description:
      "Choose from various ride options including luxury and comfort rides.",
    details:
      "Executive cars, professional drivers, and premium amenities available.",
    gradient: "from-indigo-500 to-indigo-600",
    badge: "Quality",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            Features
          </Badge>
          <h2 className="text-5xl lg:text-6xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Choose RideShare?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the best ride-sharing service with features designed for
            your comfort and convenience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <HoverCard key={index} openDelay={200}>
                <HoverCardTrigger>
                  <div>
                    <Card className="group cursor-pointer border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="text-white" size={28} />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {feature.badge}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="top">
                  <div className="space-y-2">
                    <h4 className="text-sm">Additional Details</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.details}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
