"use client";

import { motion } from "framer-motion";
import { Check, UserCheck,SlidersHorizontal } from "lucide-react";

const detailedFeatures = [
  {
    title: "Gestão de Pausas em Tempo Real",
    description: "Defina regras claras. Crie 'Eventos de Pausa' (Almoço, Café) e estabeleça o número exato de colaboradores que podem estar ausentes simultaneamente. O caos das planilhas acabou.",
    benefits: [
      "Evite gargalos no atendimento.",
      "Garanta cobertura total em horários de pico.",
      "Dê visibilidade para toda a equipe.",
    ],
    icon: SlidersHorizontal,
    visual: (
      <div className="w-full h-full p-4 rounded-2xl bg-black/10">
        <div className="h-6 w-1/3 rounded-md bg-white/10 animate-pulse mb-4"></div>
        <div className="h-full w-full rounded-lg bg-black/10 flex items-end p-4 gap-2">
          <div className="w-1/4 h-[30%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-100"></div>
          <div className="w-1/4 h-[60%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-200"></div>
          <div className="w-1/4 h-[40%] rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 animate-pulse delay-300"></div>
        </div>
      </div>
    )
  },
  {
    title: "Autonomia para o Colaborador",
    description: "Chega de 'posso ir?'. O funcionário vê o contador de vagas em tempo real. Se houver vaga, ele clica para sair e clica para voltar. Simples, rápido e justo.",
    benefits: [
      "Reduz o microgerenciamento.",
      "Aumenta a satisfação e confiança da equipe.",
      "Processo transparente e imparcial.",
    ],
    icon: UserCheck,
    visual: (
      <div className="w-full h-full p-4 rounded-2xl bg-black/10 flex gap-4">
        <div className="w-1/2 h-full rounded-lg bg-black/10 p-4 space-y-3">
          <div className="h-6 w-1/2 rounded-md bg-white/10 animate-pulse"></div>
          <div className="h-10 w-full rounded-md bg-[#89F336]/80 animate-pulse delay-200"></div>
          <div className="h-10 w-full rounded-md bg-white/10 animate-pulse delay-300"></div>
        </div>
        <div className="w-1/2 h-full rounded-lg bg-black/10 p-4 space-y-3">
          <div className="h-6 w-1/2 rounded-md bg-white/10 animate-pulse"></div>
          <div className="h-10 w-full rounded-md bg-white/10 animate-pulse delay-200"></div>
          <div className="h-10 w-full rounded-md bg-[#89F336]/80 animate-pulse delay-300"></div>
        </div>
      </div>
    )
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-gray-50 dark:bg-[#121214] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 z-10 relative space-y-32">
        
        {detailedFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="shrink-0 w-12 h-12 flex items-center justify-center 
                              rounded-xl bg-green-700/10 dark:bg-[#89F336]/10 
                              border border-green-700/20 dark:border-[#89F336]/20 
                              text-green-700 dark:text-[#89F336] shadow-inner">
                <feature.icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-3 pt-4">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-[#89F336]" strokeWidth={3} />
                    <span className="text-base text-gray-700 dark:text-white/80 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`h-80 rounded-4xl bg-white dark:bg-[#18181B] 
                             border border-gray-200 dark:border-white/5 
                             shadow-xl dark:shadow-black/20
                             ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
              {feature.visual}
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}