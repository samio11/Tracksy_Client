import { DriverCTA } from "@/components/HomeComponents/DriverCTA";
import { Features } from "@/components/HomeComponents/Features";
import { Hero } from "@/components/HomeComponents/Hero";
import { HowItWorks } from "@/components/HomeComponents/HowItWorks";
import { Testimonials } from "@/components/HomeComponents/Testimonials";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Pricing /> */}
        <Testimonials />
        <DriverCTA />
      </main>
    </div>
  );
}
