"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function DocsHero() {
  return (
    <section className="relative w-full overflow-hidden pt-48 pb-24 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"></div>
      <div className="absolute top-0 left-1/4 z-0 h-[600px] w-[1000px] animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/5 blur-[200px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-gray-900 md:text-7xl dark:text-white">
            Documentação BreakFlow
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-500 md:text-xl dark:text-[#9A9A9A]">
            Encontre guias, referências de API e tutoriais para integrar e gerenciar sua equipe com
            perfeição.
          </p>

          <form className="group relative w-full max-w-xl">
            <div className="absolute top-1/2 left-6 z-10 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[#1a7c37] dark:text-[#666] dark:group-focus-within:text-[#89F336]">
              <Search className="h-6 w-6" />
            </div>

            <input
              type="text"
              placeholder="Pesquisar na documentação... (ex: 'Criar Evento')"
              className="/* Light Mode */ /* Dark Mode */ h-16 w-full rounded-2xl border border-gray-200 bg-white pr-6 pl-16 text-base font-medium text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 hover:border-gray-300 hover:bg-gray-50 focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10 dark:border-white/5 dark:bg-[#18181B] dark:text-white dark:shadow-black/20 dark:placeholder:text-[#666] dark:hover:border-white/10 dark:hover:bg-[#1E1E22] dark:focus:border-[#89F336]/50 dark:focus:bg-[#18181B] dark:focus:ring-4 dark:focus:ring-[#89F336]/10"
            />
            {/* Atalho de Teclado (Estilo Linear/Vercel) */}
            <div className="absolute top-1/2 right-5 -translate-y-1/2 rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-[#9A9A9A]">
              Ctrl K
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
