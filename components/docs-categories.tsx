"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Rocket, SlidersHorizontal, UserCheck, Code, BookOpen, LifeBuoy } from "lucide-react";

const categories = [
  {
    icon: Rocket,
    title: "Primeiros Passos",
    description: "Configure sua organização e convide seu time em menos de 5 minutos.",
    href: "/docs/primeiros-passos",
  },
  {
    icon: SlidersHorizontal,
    title: "Guia do Gestor",
    description: "Aprenda a criar eventos, gerenciar pausas e extrair relatórios.",
    href: "/docs/guia-gestor",
  },
  {
    icon: UserCheck,
    title: "Guia do Funcionário",
    description: "Como bater o ponto de pausa, ver o status da equipe e gerenciar sua conta.",
    href: "/docs/guia-funcionario",
  },
  {
    icon: Code,
    title: "Referência da API",
    description: "Automatize tarefas e integre o BreakFlow com suas ferramentas.",
    href: "/docs/api",
  },
  {
    icon: BookOpen,
    title: "Conceitos Chave",
    description: "Entenda a filosofia por trás da gestão de 'Fluxo' vs. 'Microgerenciamento'.",
    href: "/docs/conceitos",
  },
  {
    icon: LifeBuoy,
    title: "Suporte & Contato",
    description: "Não encontrou o que procurava? Fale conosco diretamente.",
    href: "/contato",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: i * 0.05,
    },
  }),
};

export function DocsCategories() {
  return (
    <section className="relative -mt-16 w-full pb-24 sm:pb-32">
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                href={item.href}
                className="group hover:dark:shadow-primary/20 dark:hover:border-primary/30 flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-300 hover:shadow-2xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20"
              >
                <div className="group-hover:shadow-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-700/20 bg-green-700/10 text-green-700 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg dark:border-[#89F336]/20 dark:bg-[#89F336]/10 dark:text-[#89F336]">
                  <item.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>

                <div className="mt-6">
                  <h3 className="group-hover:text-primary dark:group-hover:text-primary text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
