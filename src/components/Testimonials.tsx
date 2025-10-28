import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    image:
      "https://images.unsplash.com/photo-1680428605711-cbce24bb22f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRyaXZlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU3MzkwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content:
      "RideShare has completely changed my daily commute. The drivers are professional, the app is easy to use, and I always feel safe. Highly recommended!",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Michael Chen",
    role: "Business Professional",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content:
      "As someone who travels frequently for work, RideShare's business option is perfect. The executive vehicles are top-notch and billing is seamless.",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Emma Davis",
    role: "Student",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content:
      "The ride-sharing option has helped me save so much money! I've also met great people during my commute to university. Love it!",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "James Wilson",
    role: "Night Shift Worker",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content:
      "Working late nights, I need reliable transportation. RideShare is always available, even at 3 AM. The 24/7 service is a lifesaver.",
    rating: 5,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Lisa Anderson",
    role: "Parent",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    content:
      "The safety features give me peace of mind. I can track my rides in real-time and share my trip with family. Perfect for parents!",
    rating: 5,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "David Martinez",
    role: "Weekend Traveler",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content:
      "I use RideShare every weekend to explore the city. The pricing is transparent and affordable. No more worrying about parking!",
    rating: 5,
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            Testimonials
          </Badge>
          <h2 className="text-5xl lg:text-6xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            What Our Riders Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join millions of satisfied riders who trust RideShare for their
            daily transportation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
              />

              <CardHeader className="relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full bg-gradient-to-br ${testimonial.gradient} p-1`}
                    >
                      <Star className="text-white fill-white" size={16} />
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <Quote
                    className="absolute -top-2 -left-2 text-muted-foreground/20"
                    size={40}
                  />
                  <p className="text-base text-muted-foreground relative z-10 italic leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="relative">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-br ${testimonial.gradient} text-white`}
                      >
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br ${testimonial.gradient} rounded-full border-2 border-white`}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
