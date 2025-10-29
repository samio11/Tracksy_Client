import { Car, TrendingUp, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const benefits = [
  {
    icon: TrendingUp,
    title: "Earn More",
    description: "Set your own schedule and earn competitive rates",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Drive when you want, as much as you want",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "24/7 support and insurance coverage included",
    gradient: "from-purple-500 to-pink-600",
  },
];

export function DriverCTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="px-4 py-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                <Car className="mr-2 h-4 w-4" />
                For Drivers
              </Badge>

              <h2 className="text-5xl lg:text-6xl bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Drive with RideShare and Earn on Your Terms
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Join our community of drivers and start earning money while
                helping people get where they need to go.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <CardContent className="p-5 flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl text-white">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
              >
                Become a Driver
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1680428605711-cbce24bb22f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRyaXZlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU3MzkwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy driver"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating earnings card */}
            <Card className="absolute -bottom-6 -right-6 shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Avg Weekly Earnings
                    </div>
                    <div className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      $1,250
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp size={14} />
                      12% from last week
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
