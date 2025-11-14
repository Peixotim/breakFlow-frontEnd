"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rss } from "lucide-react";

const featuredPost = {
  slug: "/blog/otimizando-pausas",
  tag: "Produtividade",
  title: "Como a Gestão de Pausas Otimizada Aumentou a Eficiência em 30%",
  excerpt:
    "Um estudo de caso profundo sobre como a gestão de fluxo pode transformar um time caótico em uma operação fluida.",
  author: {
    name: "Juliana Silva",
    avatar: "/avatars/avatar-1.png",
  },
};

export function BlogHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 pt-48 pb-24 sm:pb-32 dark:bg-[#121214]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"></div>
      <div className="absolute top-0 left-1/4 z-0 h-[600px] w-[1000px] animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/5 blur-[200px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-green-700/20 bg-green-700/10 text-green-700 shadow-inner dark:border-[#89F336]/20 dark:bg-[#89F336]/10 dark:text-[#89F336]">
            <Rss className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-gray-900 md:text-7xl dark:text-white">
            O Hub de Produtividade
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
            Insights, dicas e atualizações do BreakFlow para otimizar o fluxo da sua equipe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl lg:grid-cols-5 dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/30"
        >
          <motion.div
            className="relative flex h-80 items-center justify-center overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 p-6 lg:col-span-3 lg:h-auto dark:from-black/20 dark:to-black/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Mockup "Glass" do Dashboard */}
            <motion.div
              className="flex h-full max-h-[250px] w-full max-w-md gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 shadow-xl backdrop-blur-lg lg:max-h-full dark:border-white/10 dark:bg-black/20"
              initial={{ opacity: 0.8, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              {/* Sidebar Falsa */}
              <div className="h-full w-1/4 space-y-3 rounded-lg bg-black/10 p-3">
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-white/20"></div>
                <div className="h-4 w-full animate-pulse rounded-md bg-white/10 delay-100"></div>
                <div className="h-4 w-full animate-pulse rounded-md bg-white/10 delay-200"></div>
              </div>
              {/* Content Falso */}
              <div className="h-full w-3/4 space-y-3 rounded-lg bg-black/10 p-3">
                <div className="h-4 w-1/2 animate-pulse rounded-md bg-white/20"></div>
                <div className="flex h-3/4 items-end justify-around">
                  <motion.div
                    className="h-[30%] w-1/4 rounded-t-md bg-[#89F336]"
                    initial={{ height: "10%" }}
                    animate={{ height: ["10%", "50%", "30%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="h-[60%] w-1/4 rounded-t-md bg-[#89F336]"
                    initial={{ height: "80%" }}
                    animate={{ height: ["80%", "40%", "60%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div
                    className="h-[40%] w-1/4 rounded-t-md bg-[#89F336]"
                    initial={{ height: "20%" }}
                    animate={{ height: ["20%", "70%", "40%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Conteúdo (Direita) */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-2">
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 dark:bg-[#89F336]/10 dark:text-[#89F336]">
                {featuredPost.tag}
              </span>
            </div>

            <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              <Link
                href={featuredPost.slug}
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                {featuredPost.title}
              </Link>
            </h3>

            <p className="mb-6 text-base leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
              {featuredPost.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-tr from-[#89F336] to-[#9EFF55]"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {featuredPost.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#9A9A9A]">14 de Nov, 2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
