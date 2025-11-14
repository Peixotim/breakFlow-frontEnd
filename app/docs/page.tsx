"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { DocsHero } from "@/components/docs-hero";
import { DocsCategories } from "@/components/docs-categories";

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50 text-gray-900 selection:bg-[#89F336]/30 dark:bg-[#121214] dark:text-[#EDEDED]">
      <Header />

      <main>
        <DocsHero />
        <DocsCategories />
      </main>

      <Footer />
    </div>
  );
}
