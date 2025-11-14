"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (

    <section className="relative w-full h-screen flex flex-col items-center justify-start pt-32 px-4 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] 
                        bg-[#89F336]/10 rounded-full blur-[200px] 
                        animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      </div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>


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
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent 
                       bg-clip-text bg-linear-to-b from-white to-white/70 
                       drop-shadow-lg mb-6 max-w-4xl">
          Produtividade Fluida Começa Aqui
        </h1>

        <p className="text-lg md:text-xl text-[#9A9A9A] max-w-2xl mb-10 leading-relaxed">
          Otimize a produtividade da sua equipe. BreakFlow é a plataforma de gestão de pausas 
          que garante cobertura total, sem o microgerenciamento.
        </p>


        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/register" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full font-bold text-lg text-[#0B0C10]
                       bg-[#89F336] hover:bg-[#9EFF55] 
                       shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]
                       transition-all duration-300 active:scale-95"
          >
            Cadastrar Empresa Grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="#demo" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full font-medium
                       bg-white/5 hover:bg-white/10 text-white/80 hover:text-white
                       border border-white/10 backdrop-blur-md
                       transition-all duration-300 active:scale-95"
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
        <div className="w-full h-[400px] rounded-[2.5rem] 
                        bg-white/5 backdrop-blur-xl
                        border border-white/10 
                        shadow-2xl overflow-hidden p-4">
          
          <div className="w-full h-full flex gap-4">
            <div className="w-1/5 h-full rounded-2xl bg-black/10 p-4 space-y-3">
              <div className="h-6 w-1/2 rounded-md bg-white/10 animate-pulse"></div>
              <div className="h-4 w-3/4 rounded-md bg-white/5 animate-pulse delay-100"></div>
              <div className="h-4 w-full rounded-md bg-white/5 animate-pulse delay-200"></div>
              <div className="h-4 w-2/3 rounded-md bg-white/5 animate-pulse delay-300"></div>
            </div>
            <div className="w-4/5 h-full rounded-2xl bg-black/10 p-4">
              <div className="h-6 w-1/4 rounded-md bg-white/10 animate-pulse mb-4"></div>
              <div className="w-full h-3/4 flex items-end gap-1">
                <div className="w-1/12 h-[20%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse"></div>
                <div className="w-1/12 h-[30%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-100"></div>
                <div className="w-1/12 h-[50%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-200"></div>
                <div className="w-1/12 h-[40%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-300"></div>
                <div className="w-1/12 h-[60%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}