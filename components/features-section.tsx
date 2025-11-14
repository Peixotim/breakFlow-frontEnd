"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, UserCheck, BarChart3 } from "lucide-react";

const features = [
  {
    icon: SlidersHorizontal,
    title: "1. Defina as Regras",
    description:
      "Crie 'Eventos de Pausa' (ex: Almoço) e defina o limite de pessoas que podem sair ao mesmo tempo. Sem planilhas, sem caos.",
  },
  {
    icon: UserCheck,
    title: "2. A Equipe Gerencia",
    description:
      "Funcionários veem o contador de 'vagas' em tempo real. Eles clicam para sair e voltar. O BreakFlow gerencia a fila automaticamente.",
  },
  {
    icon: BarChart3,
    title: "3. Analise os Dados",
    description:
      "Identifique gargalos. Veja o tempo médio de pausa por equipe e otimize a alocação de pessoal com relatórios claros e visuais.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: i * 0.15,
    },
  }),
};

export function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 pt-24 pb-16 sm:pt-32 sm:pb-24 dark:bg-[#121214]">
      <div className="absolute top-1/4 left-1/2 z-0 h-[600px] w-[1000px] -translate-x-1/2 animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/5 blur-[200px]" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="bg-linear-to-r from-green-700 to-green-500 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase dark:from-[#89F336] dark:to-[#9EFF55]">
            Como Funciona
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tighter text-gray-900 md:text-5xl dark:text-white">
            Transforme o Caos em Fluxo
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
            O BreakFlow funciona em um ciclo simples de 3 etapas, dando autonomia à sua equipe e
            poder de gestão a você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-700/20 bg-green-700/10 text-green-700 shadow-inner dark:border-[#89F336]/20 dark:bg-[#89F336]/10 dark:text-[#89F336]">
                <feature.icon className="h-6 w-6" strokeWidth={2.5} />
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
