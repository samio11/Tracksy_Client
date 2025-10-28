import {
  MapPin,
  Navigation,
  Clock,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:shadow-lg transition-shadow">
                <Zap className="mr-2 h-4 w-4" />
                Your Ride, Your Way
              </Badge>

              <h1 className="text-5xl lg:text-7xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                Get There Faster, Together
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Experience the future of transportation. Safe, reliable, and
                affordable rides at your fingertips.
              </p>
            </div>

            {/* Booking Form */}
            {/* <Card className="shadow-2xl border-2 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <Input
                      placeholder="Pickup location"
                      className="flex-1 border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                      <Navigation className="text-white" size={20} />
                    </div>
                    <Input
                      placeholder="Destination"
                      className="flex-1 border-2 focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                      <Clock className="text-white" size={20} />
                    </div>
                    <Input
                      type="time"
                      placeholder="Pickup time"
                      className="flex-1 border-2 focus:border-pink-500 transition-colors"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  Find a Ride
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card> */}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    10M+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Happy Riders
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-purple-200 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    500K+
                  </div>
                  <div className="text-sm text-muted-foreground">Drivers</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-pink-200 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    150+
                  </div>
                  <div className="text-sm text-muted-foreground">Cities</div>
                </CardContent>
              </Card>
            </div>
            {/* Extra */}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Book A Ride
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631477404040-e85358c37ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBkcml2aW5nJTIwY2l0eXxlbnwxfHx8fDE3NjE1NzM5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern car driving in city"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 shadow-2xl border-2 border-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-2xl">4.9/5.0</div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
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
