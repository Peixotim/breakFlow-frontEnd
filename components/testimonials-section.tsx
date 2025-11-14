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
    <section className="relative w-full overflow-hidden bg-gray-50 pt-16 pb-24 sm:pt-24 sm:pb-32 dark:bg-[#121214]">
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
            Prova Social
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tighter text-gray-900 md:text-5xl dark:text-white">
            Quem usa, confia.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
            Veja o que gestores e equipes estão dizendo sobre a organização que o BreakFlow trouxe
            para o dia a dia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20"
            >
              <div className="grow">
                <Quote
                  className="mb-4 h-10 w-10 text-green-700/30 dark:text-[#89F336]/30"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
                <p className="text-lg leading-relaxed text-gray-800 dark:text-white">
                  {item.quote}
                </p>
              </div>

              <div className="mt-8 flex items-center border-t border-gray-200 pt-6 dark:border-white/10">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-[#9A9A9A]">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
