"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { FeaturesPageHero } from "@/components/features-page-hero";
import { FeaturesGrid } from "@/components/features-grid";
export default function FeaturesPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden 
                    bg-gray-50 dark:bg-[#121214] 
                    text-gray-900 dark:text-[#EDEDED] 
                    selection:bg-[#89F336]/30">
      
      <Header />

      <main>
        <FeaturesPageHero />
        <FeaturesGrid />
        
      </main>

      <Footer />

    </div>
  );
}