"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section"; // 1. Importe
import { Footer } from "@/components/Footer"; 

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-hidden 
                    bg-gray-50 dark:bg-[#121214] 
                    text-gray-900 dark:text-[#EDEDED] 
                    selection:bg-[#89F336]/30">
      
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection /> 
      </main>

      <Footer />

    </div>
  );
}