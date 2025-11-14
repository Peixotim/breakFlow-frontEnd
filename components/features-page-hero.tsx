"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

export function FeaturesPageHero() {
  return (
    <section className="relative w-full overflow-hidden pt-48 pb-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 z-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/10 blur-[200px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#89F336]/20 bg-[#89F336]/10 text-[#89F336] shadow-inner">
            <SlidersHorizontal className="h-8 w-8" strokeWidth={2} />
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-gray-900 md:text-7xl dark:text-white">
            O Poder por Trás do <span className="text-primary">Fluxo</span>.
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 md:text-xl dark:text-[#9A9A9A]">
            O BreakFlow é mais do que um app. É uma nova forma de pensar a produtividade. Descubra
            as ferramentas que dão autonomia à sua equipe e inteligência ao seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
