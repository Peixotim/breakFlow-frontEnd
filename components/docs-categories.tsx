"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { 
  Rocket,
  SlidersHorizontal,
  UserCheck, 
  Code, 
  BookOpen,
  LifeBuoy
} from "lucide-react";

const categories = [
  {
    icon: Rocket,
    title: "Primeiros Passos",
    description: "Configure sua organização e convide seu time em menos de 5 minutos.",
    href: "/docs/primeiros-passos"
  },
  {
    icon: SlidersHorizontal,
    title: "Guia do Gestor",
    description: "Aprenda a criar eventos, gerenciar pausas e extrair relatórios.",
    href: "/docs/guia-gestor"
  },
  {
    icon: UserCheck,
    title: "Guia do Funcionário",
    description: "Como bater o ponto de pausa, ver o status da equipe e gerenciar sua conta.",
    href: "/docs/guia-funcionario"
  },
  {
    icon: Code,
    title: "Referência da API",
    description: "Automatize tarefas e integre o BreakFlow com suas ferramentas.",
    href: "/docs/api"
  },
  {
    icon: BookOpen,
    title: "Conceitos Chave",
    description: "Entenda a filosofia por trás da gestão de 'Fluxo' vs. 'Microgerenciamento'.",
    href: "/docs/conceitos"
  },
  {
    icon: LifeBuoy,
    title: "Suporte & Contato",
    description: "Não encontrou o que procurava? Fale conosco diretamente.",
    href: "/contato"
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
    <section className="relative w-full pb-24 sm:pb-32 -mt-16">
      <div className="container mx-auto max-w-7xl px-4 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group flex flex-col p-8 rounded-3xl h-full
                           bg-white dark:bg-[#18181B] 
                           border border-gray-200 dark:border-white/5 
                           shadow-xl dark:shadow-black/20
                           hover:shadow-2xl hover:dark:shadow-primary/20
                           hover:border-gray-300 dark:hover:border-primary/30
                           transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 flex items-center justify-center 
                              rounded-xl bg-green-700/10 dark:bg-[#89F336]/10 
                              border border-green-700/20 dark:border-[#89F336]/20 
                              text-green-700 dark:text-[#89F336] shadow-inner
                              group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10
                              transition-transform duration-300">
                  <item.icon className="w-6 h-6" strokeWidth={2.5} />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white
                                 group-hover:text-primary dark:group-hover:text-primary
                                 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
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