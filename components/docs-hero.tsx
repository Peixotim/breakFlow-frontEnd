"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function DocsHero() {
  return (
    <section className="relative w-full pt-48 pb-24 sm:pb-32 overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] 
                      bg-[#89F336]/5 rounded-full blur-[200px] 
                      animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] z-0" />

      <div className="container mx-auto max-w-7xl px-4 z-10 relative">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter 
                         text-gray-900 dark:text-white mb-6">
            Documentação BreakFlow
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-[#9A9A9A] leading-relaxed mb-10">
            Encontre guias, referências de API e tutoriais para integrar
            e gerenciar sua equipe com perfeição.
          </p>

          <form className="relative w-full max-w-xl group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#666] 
                            group-focus-within:text-[#1a7c37] dark:group-focus-within:text-[#89F336]
                            transition-colors duration-300 z-10">
              <Search className="w-6 h-6" />
            </div>
            
            <input
              type="text"
              placeholder="Pesquisar na documentação... (ex: 'Criar Evento')"
              className="h-16 w-full rounded-2xl border pl-16 pr-6 text-base font-medium outline-none transition-all duration-300 shadow-sm
                         
                         /* Light Mode */
                         bg-white border-gray-200 text-gray-900 placeholder:text-gray-400
                         hover:border-gray-300 hover:bg-gray-50
                         focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10
                         
                         /* Dark Mode */
                         dark:bg-[#18181B] dark:border-white/5 dark:text-white dark:placeholder:text-[#666]
                         dark:hover:border-white/10 dark:hover:bg-[#1E1E22]
                         dark:focus:border-[#89F336]/50 dark:focus:ring-4 dark:focus:ring-[#89F336]/10 dark:focus:bg-[#18181B]
                         dark:shadow-black/20"
            />
            {/* Atalho de Teclado (Estilo Linear/Vercel) */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 
                            px-2 py-0.5 rounded-md border border-gray-300 dark:border-white/10 
                            bg-gray-100 dark:bg-white/5 
                            text-xs font-mono text-gray-500 dark:text-[#9A9A9A]">
              Ctrl K
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
}