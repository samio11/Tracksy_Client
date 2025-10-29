import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  HelpCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri 9am-6pm EST",
    contact: "+8801709801305",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24 hours",
    contact: "samiohasan6@gmail.com",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available 24/7",
    contact: "Start Chat",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Monday - Friday",
    contact: "Nikunja-02,Khilkhet,Dhaka",
    gradient: "from-orange-500 to-amber-600",
  },
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Tech Avenue, Suite 500",
    state: "CA 94105",
    phone: "(415) 555-0100",
    email: "sf@rideshare.com",
  },
  {
    city: "New York",
    address: "456 Madison Avenue, Floor 20",
    state: "NY 10022",
    phone: "(212) 555-0200",
    email: "ny@rideshare.com",
  },
  {
    city: "Austin",
    address: "789 Innovation Blvd, Building C",
    state: "TX 78701",
    phone: "(512) 555-0300",
    email: "austin@rideshare.com",
  },
];

const faqs = [
  {
    question: "How do I book a ride?",
    answer:
      "Simply download our app, create an account, enter your pickup and destination locations, and request a ride. A driver will be matched with you within minutes.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and in-app wallet balance.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "Visit our 'Become a Driver' page, complete the application form, submit required documents, and pass a background check. Once approved, you can start earning.",
  },
  {
    question: "Is there a cancellation fee?",
    answer:
      "If you cancel within 2 minutes of requesting a ride, there's no fee. After 2 minutes, a small cancellation fee may apply depending on your location.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is based on distance, time, route, and demand. You'll see an estimated fare before confirming your ride.",
  },
  {
    question: "What if I left something in the car?",
    answer:
      "Contact us immediately through the app's 'Lost Items' feature. We'll help you connect with your driver to retrieve your belongings.",
  },
];

export default function Contact() {
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
              Get In Touch
            </Badge>
            <h1 className="text-5xl lg:text-7xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? Need support? Our team is ready to assist you
              24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mx-auto mb-4`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {method.contact}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="space-y-4 mb-8">
                <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <Card className="border-2 shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="border-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="driver">Driver Support</SelectItem>
                        <SelectItem value="billing">
                          Billing Question
                        </SelectItem>
                        <SelectItem value="partnership">
                          Partnership Opportunity
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="border-2 min-h-[150px]"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBoZWFkc2V0fGVufDF8fHx8MTc2MTY3MDc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Customer support"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <CardTitle>Business Hours</CardTitle>
                      <CardDescription>
                        We're here when you need us
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday:
                    </span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span>Closed</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span>24/7 Emergency Support Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              Locations
            </Badge>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Our Offices
            </h2>
            <p className="text-xl text-muted-foreground">
              Visit us at one of our locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-2xl">{office.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-muted-foreground">{office.address}</p>
                    <p className="text-muted-foreground">{office.state}</p>
                  </div>
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-muted-foreground" />
                      <span className="text-blue-600">{office.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Badge>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
