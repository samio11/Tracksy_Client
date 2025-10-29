import { Smartphone, Search, Car, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const steps = [
  {
    icon: Smartphone,
    title: "Download the App",
    description:
      "Get the RideShare app from App Store or Google Play. Sign up in minutes.",
    step: "01",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Request a Ride",
    description:
      "Enter your destination and choose from multiple ride options.",
    step: "02",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Car,
    title: "Get Picked Up",
    description:
      "Meet your driver at the pickup location. Track them in real-time.",
    step: "03",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Star,
    title: "Rate Your Trip",
    description:
      "Enjoy your ride and rate your experience. We value your feedback.",
    step: "04",
    gradient: "from-orange-500 to-amber-500",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            Process
          </Badge>
          <h2 className="text-5xl lg:text-6xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in four simple steps and experience seamless
            transportation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line - desktop only */}
          <div
            className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-pink-200 to-orange-200 -z-0 rounded-full"
            style={{ width: "calc(100% - 8rem)", marginLeft: "4rem" }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="relative border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="relative">
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-4">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10 relative`}
                      >
                        <Icon className="text-white" size={32} />
                      </div>
                      {/* <Badge className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-primary p-0 z-20 shadow-md">
                        <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                      </Badge> */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl opacity-20 blur-xl`}
                      />
                    </div>
                    <CardTitle className="text-center text-xl">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative text-center">
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
