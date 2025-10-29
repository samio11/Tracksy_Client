import {
  Target,
  Heart,
  Zap,
  Users,
  Award,
  Globe,
  TrendingUp,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make puts our riders and drivers at the center.",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description: "Building a platform where everyone feels secure and valued.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly improving our technology to serve you better.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description:
      "Committed to reducing our carbon footprint through shared rides.",
    gradient: "from-green-500 to-emerald-600",
  },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "15+ years in transportation technology",
  },
  {
    name: "David Chen",
    role: "CTO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Former lead engineer at major tech companies",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Safety",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Expert in transportation safety protocols",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Operations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "Scaling operations across 150+ cities",
  },
];

const milestones = [
  {
    year: "2018",
    title: "Founded",
    description: "RideShare was born with a vision",
  },
  {
    year: "2019",
    title: "1M Rides",
    description: "Reached our first million rides",
  },
  {
    year: "2021",
    title: "50 Cities",
    description: "Expanded to 50 cities worldwide",
  },
  {
    year: "2023",
    title: "Carbon Neutral",
    description: "Achieved carbon neutral operations",
  },
  {
    year: "2025",
    title: "10M Users",
    description: "Serving over 10 million happy riders",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              About RideShare
            </Badge>
            <h1 className="text-5xl lg:text-7xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              Reimagining Transportation for Everyone
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make transportation accessible, affordable,
              and sustainable for communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                Our Mission
              </Badge>
              <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Building a Better Way to Move
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2018, RideShare was created with a simple yet
                powerful vision: to make getting around easier, more affordable,
                and more sustainable for everyone. We believe that
                transportation should be a right, not a privilege.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to serve millions of riders and support
                hundreds of thousands of drivers across 150+ cities worldwide.
                But we're just getting started.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      10M+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Users
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      500K+
                    </div>
                    <div className="text-sm text-muted-foreground">Drivers</div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      150+
                    </div>
                    <div className="text-sm text-muted-foreground">Cities</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1676275773812-637590f8e7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjE2NDc2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Team meeting"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
              Our Values
            </Badge>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              What We Stand For
            </h2>
            <p className="text-xl text-muted-foreground">
              Our core values guide everything we do, from product development
              to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-4`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white border-0">
              Leadership
            </Badge>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              The passionate people driving RideShare forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <CardHeader>
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-base">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white border-0">
              Our Journey
            </Badge>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Milestones
            </h2>
            <p className="text-xl text-muted-foreground">
              Key moments in our journey to transform transportation
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <Card
                    className={`flex-1 border-2 hover:border-primary/50 hover:shadow-xl transition-all ${
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {milestone.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {milestone.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center shadow-xl text-white z-10 flex-shrink-0">
                    {milestone.year}
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Join Us on Our Journey
            </h2>
            <p className="text-xl text-gray-300">
              Whether you're a rider, driver, or partner, you're part of the
              RideShare family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/" className="inline-block">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-xl hover:shadow-2xl transition-all">
                  Start Riding
                </button>
              </a>
              <a href="/" className="inline-block">
                <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg hover:bg-white/20 transition-all">
                  Become a Driver
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
