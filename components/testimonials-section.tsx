"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Juliana Silva",
    title: "Gerente de RH, TechSolutions",
    avatar: "/avatars/avatar-1.png",
    quote:
      "O BreakFlow mudou o jogo. O caos das pausas de almoço desapareceu. Agora temos cobertura total, e a equipe se sente mais autônoma.",
  },
  {
    name: "Ricardo Mendes",
    title: "Líder de Suporte, Nexus Digital",
    avatar: "/avatars/avatar-2.png",
    quote:
      "Eu costumava gastar 30 minutos por dia organizando quem ia pausar. Agora, o BreakFlow faz isso. Minha produtividade e a do time dispararam.",
  },
  {
    name: "Carla Pereira",
    title: "Funcionária, HubFin",
    avatar: "/avatars/avatar-3.png",
    quote:
      "É muito mais justo. Eu vejo quando tem vaga para o café e não preciso ficar pedindo permissão. Simples, rápido e funciona.",
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
      delay: i * 0.1,
    },
  }),
};

export function TestimonialsSection() {
  return (
    <section className="relative w-full pt-16 pb-24 sm:pt-24 sm:pb-32 bg-gray-50 dark:bg-[#121214] overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] 
                      bg-[#89F336]/5 rounded-full blur-[200px] 
                      animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] z-0" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-7xl px-4 z-10 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest
                         text-transparent bg-clip-text 
                         bg-linear-to-r from-green-700 to-green-500
                         dark:from-[#89F336] dark:to-[#9EFF55]">
            Prova Social
          </h2>
          <p className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter 
                        text-gray-900 dark:text-white">
            Quem usa, confia.
          </p>
          <p className="mt-6 text-lg text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
            Veja o que gestores e equipes estão dizendo sobre 
            a organização que o BreakFlow trouxe para o dia a dia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-between p-8 rounded-3xl h-full
                         bg-white dark:bg-[#18181B] 
                         border border-gray-200 dark:border-white/5 
                         shadow-xl dark:shadow-black/20"
            >
              <div className="grow">
                <Quote 
                  className="w-10 h-10 text-green-700/30 dark:text-[#89F336]/30 mb-4" 
                  fill="currentColor"
                  strokeWidth={1.5} 
                />
                <p className="text-lg text-gray-800 dark:text-white leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                <Image 
                  src={item.avatar}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />  
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-[#9A9A9A]">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}