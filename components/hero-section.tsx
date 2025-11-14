"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden px-4 pt-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[80vw] max-h-[1000px] w-[80vw] max-w-[1000px] animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/10 blur-[200px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-4 flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md">
          <span className="mr-1 animate-pulse">🟢</span>
          Lançamento: V1.0 Disponível Agora
        </div>
        <h1 className="mb-6 max-w-4xl bg-linear-to-b from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tighter text-transparent drop-shadow-lg md:text-7xl">
          Produtividade Fluida Começa Aqui
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
          Otimize a produtividade da sua equipe. BreakFlow é a plataforma de gestão de pausas que
          garante cobertura total, sem o microgerenciamento.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#89F336] px-8 text-lg font-bold text-[#0B0C10] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] transition-all duration-300 hover:bg-[#9EFF55] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)] active:scale-95 sm:w-auto"
          >
            Cadastrar Empresa Grátis
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#demo"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 sm:w-auto"
          >
            Ver Demonstração
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="relative z-0 mt-16 w-full max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div className="h-[400px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex h-full w-full gap-4">
            <div className="h-full w-1/5 space-y-3 rounded-2xl bg-black/10 p-4">
              <div className="h-6 w-1/2 animate-pulse rounded-md bg-white/10"></div>
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-white/5 delay-100"></div>
              <div className="h-4 w-full animate-pulse rounded-md bg-white/5 delay-200"></div>
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-white/5 delay-300"></div>
            </div>
            <div className="h-full w-4/5 rounded-2xl bg-black/10 p-4">
              <div className="mb-4 h-6 w-1/4 animate-pulse rounded-md bg-white/10"></div>
              <div className="flex h-3/4 w-full items-end gap-1">
                <div className="h-[20%] w-1/12 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0"></div>
                <div className="h-[30%] w-1/12 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-100"></div>
                <div className="h-[50%] w-1/12 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-200"></div>
                <div className="h-[40%] w-1/12 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-300"></div>
                <div className="h-[60%] w-1/12 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
