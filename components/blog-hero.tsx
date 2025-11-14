"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rss } from "lucide-react"; 


const featuredPost = {
  slug: "/blog/otimizando-pausas",
  tag: "Produtividade",
  title: "Como a Gestão de Pausas Otimizada Aumentou a Eficiência em 30%",
  excerpt: "Um estudo de caso profundo sobre como a gestão de fluxo pode transformar um time caótico em uma operação fluida.",
  author: {
    name: "Juliana Silva",
    avatar: "/avatars/avatar-1.png",
  },
};

export function BlogHero() {
  return (
    <section className="relative w-full pt-48 pb-24 sm:pb-32 overflow-hidden
                        bg-gray-50 dark:bg-[#121214]">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] 
                      bg-[#89F336]/5 rounded-full blur-[200px] 
                      animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] z-0" />

      <div className="container mx-auto max-w-7xl px-4 z-10 relative">

        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="shrink-0 w-16 h-16 flex items-center justify-center 
                          rounded-2xl bg-green-700/10 dark:bg-[#89F336]/10 
                          border border-green-700/20 dark:border-[#89F336]/20 
                          text-green-700 dark:text-[#89F336] shadow-inner mb-6 mx-auto">
            <Rss className="w-8 h-8" strokeWidth={2} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter 
                        text-gray-900 dark:text-white">
            O Hub de Produtividade
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
            Insights, dicas e atualizações do BreakFlow para otimizar o fluxo da sua equipe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden
                     rounded-3xl bg-white dark:bg-[#18181B] 
                     border border-gray-200 dark:border-white/5 
                     shadow-2xl dark:shadow-black/30"
        >
          <motion.div 
            className="lg:col-span-3 h-80 lg:h-auto relative p-6 
                       flex items-center justify-center overflow-hidden
                       bg-linear-to-br from-gray-100 to-gray-200
                       dark:from-black/20 dark:to-black/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Mockup "Glass" do Dashboard */}
            <motion.div 
              className="w-full h-full max-w-md max-h-[250px] lg:max-h-full 
                         rounded-2xl bg-white/30 dark:bg-black/20 
                         backdrop-blur-lg border border-white/20 dark:border-white/10
                         shadow-xl flex gap-3 p-4"
              initial={{ opacity: 0.8, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              {/* Sidebar Falsa */}
              <div className="w-1/4 h-full rounded-lg bg-black/10 p-3 space-y-3">
                <div className="h-4 w-3/4 rounded-md bg-white/20 animate-pulse"></div>
                <div className="h-4 w-full rounded-md bg-white/10 animate-pulse delay-100"></div>
                <div className="h-4 w-full rounded-md bg-white/10 animate-pulse delay-200"></div>
              </div>
              {/* Content Falso */}
              <div className="w-3/4 h-full rounded-lg bg-black/10 p-3 space-y-3">
                <div className="h-4 w-1/2 rounded-md bg-white/20 animate-pulse"></div>
                <div className="flex justify-around items-end h-3/4">
                  <motion.div 
                    className="w-1/4 h-[30%] rounded-t-md bg-[#89F336]"
                    initial={{ height: '10%' }}
                    animate={{ height: ['10%', '50%', '30%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-1/4 h-[60%] rounded-t-md bg-[#89F336]"
                    initial={{ height: '80%' }}
                    animate={{ height: ['80%', '40%', '60%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div 
                    className="w-1/4 h-[40%] rounded-t-md bg-[#89F336]"
                    initial={{ height: '20%' }}
                    animate={{ height: ['20%', '70%', '40%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Conteúdo (Direita) */}
          <div className="lg:col-span-2 p-8 sm:p-10 flex flex-col justify-center">
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
                               bg-green-100 text-green-800
                               dark:bg-[#89F336]/10 dark:text-[#89F336]">
                {featuredPost.tag}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              <Link href={featuredPost.slug} className="hover:text-primary dark:hover:text-primary transition-colors">
                {featuredPost.title}
              </Link>
            </h3>
            
            <p className="text-base text-gray-500 dark:text-[#9A9A9A] leading-relaxed mb-6">
              {featuredPost.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#89F336] to-[#9EFF55] shrink-0"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {featuredPost.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#9A9A9A]">
                  14 de Nov, 2025
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}