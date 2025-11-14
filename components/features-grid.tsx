"use client";

import { motion } from "framer-motion";
import { Check, UserCheck, SlidersHorizontal } from "lucide-react";

const detailedFeatures = [
  {
    title: "Gestão de Pausas em Tempo Real",
    description:
      "Defina regras claras. Crie 'Eventos de Pausa' (Almoço, Café) e estabeleça o número exato de colaboradores que podem estar ausentes simultaneamente. O caos das planilhas acabou.",
    benefits: [
      "Evite gargalos no atendimento.",
      "Garanta cobertura total em horários de pico.",
      "Dê visibilidade para toda a equipe.",
    ],
    icon: SlidersHorizontal,
    visual: (
      <div className="h-full w-full rounded-2xl bg-black/10 p-4">
        <div className="mb-4 h-6 w-1/3 animate-pulse rounded-md bg-white/10"></div>
        <div className="flex h-full w-full items-end gap-2 rounded-lg bg-black/10 p-4">
          <div className="h-[30%] w-1/4 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-100"></div>
          <div className="h-[60%] w-1/4 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-200"></div>
          <div className="h-[40%] w-1/4 animate-pulse rounded-t-md bg-linear-to-t from-[#89F336]/50 to-[#89F336]/0 delay-300"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Autonomia para o Colaborador",
    description:
      "Chega de 'posso ir?'. O funcionário vê o contador de vagas em tempo real. Se houver vaga, ele clica para sair e clica para voltar. Simples, rápido e justo.",
    benefits: [
      "Reduz o microgerenciamento.",
      "Aumenta a satisfação e confiança da equipe.",
      "Processo transparente e imparcial.",
    ],
    icon: UserCheck,
    visual: (
      <div className="flex h-full w-full gap-4 rounded-2xl bg-black/10 p-4">
        <div className="h-full w-1/2 space-y-3 rounded-lg bg-black/10 p-4">
          <div className="h-6 w-1/2 animate-pulse rounded-md bg-white/10"></div>
          <div className="h-10 w-full animate-pulse rounded-md bg-[#89F336]/80 delay-200"></div>
          <div className="h-10 w-full animate-pulse rounded-md bg-white/10 delay-300"></div>
        </div>
        <div className="h-full w-1/2 space-y-3 rounded-lg bg-black/10 p-4">
          <div className="h-6 w-1/2 animate-pulse rounded-md bg-white/10"></div>
          <div className="h-10 w-full animate-pulse rounded-md bg-white/10 delay-200"></div>
          <div className="h-10 w-full animate-pulse rounded-md bg-[#89F336]/80 delay-300"></div>
        </div>
      </div>
    ),
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-24 sm:py-32 dark:bg-[#121214]">
      <div className="relative z-10 container mx-auto max-w-7xl space-y-32 px-4">
        {detailedFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className={`space-y-6 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-700/20 bg-green-700/10 text-green-700 shadow-inner dark:border-[#89F336]/20 dark:bg-[#89F336]/10 dark:text-[#89F336]">
                <feature.icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-bold tracking-tighter text-gray-900 md:text-4xl dark:text-white">
                {feature.title}
              </h3>
              <p className="text-lg leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
                {feature.description}
              </p>

              <ul className="space-y-3 pt-4">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 dark:text-[#89F336]" strokeWidth={3} />
                    <span className="text-base font-medium text-gray-700 dark:text-white/80">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`h-80 rounded-4xl border border-gray-200 bg-white shadow-xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
            >
              {feature.visual}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
