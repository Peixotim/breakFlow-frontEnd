"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

export function FeaturesPageHero() {
  return (
    <section className="relative w-full pt-48 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] 
                      bg-[#89F336]/10 rounded-full blur-[200px] 
                      animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] z-0" />

      <div className="container mx-auto max-w-7xl px-4 z-10 relative">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="shrink-0 w-16 h-16 flex items-center justify-center 
                          rounded-2xl bg-[#89F336]/10 
                          border border-[#89F336]/20 
                          text-[#89F336] shadow-inner mb-6">
            <SlidersHorizontal className="w-8 h-8" strokeWidth={2} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter 
                         text-gray-900 dark:text-white mb-6">
            O Poder por Trás do <span className="text-primary">Fluxo</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
            O BreakFlow é mais do que um app. É uma nova forma de pensar a produtividade. 
            Descubra as ferramentas que dão autonomia à sua equipe e inteligência ao seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}