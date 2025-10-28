import { DriverCTA } from "@/components/DriverCTA";
import { Features } from "@/components/Features";

import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

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
