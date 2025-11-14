"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog-hero";
import { BlogGrid } from "@/components/blog-grid"; 

export default function BlogPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden 
                    bg-gray-50 dark:bg-[#121214] 
                    text-gray-900 dark:text-[#EDEDED] 
                    selection:bg-[#89F336]/30">
      
      <Header />

      <main>
        <BlogHero />
        <BlogGrid /> 
      </main>

      <Footer />

    </div>
  );
}