"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Iniciante",
    price: "Grátis",
    frequency: "/ para sempre",
    description: "Para equipes pequenas testando o fluxo.",
    features: [
      "Até 10 usuários",
      "2 Eventos de Pausa (ex: Almoço, Café)",
      "Dashboard em tempo real",
      "Relatórios básicos",
    ],
    isFeatured: false,
    cta: "Comece Grátis",
    href: "/register",
  },
  {
    name: "Pro",
    price: "R$ 49",
    frequency: "/ mês",
    description: "A solução completa para times em crescimento.",
    features: [
      "Usuários ilimitados",
      "Eventos de Pausa ilimitados",
      "Relatórios avançados e exports",
      "Suporte prioritário via chat",
    ],
    isFeatured: true,
    cta: "Testar o Pro",
    href: "/register-pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "/ anual",
    description: "Para grandes corporações com necessidades de compliance e SSO.",
    features: [
      "Tudo do Pro",
      "Login Único (SSO)",
      "Auditoria de logs avançada",
      "Gerente de conta dedicado",
    ],
    isFeatured: false,
    cta: "Fale Conosco",
    href: "/contato",
  },
];

export function PricingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-24 sm:py-32 dark:bg-[#121214]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"></div>

      <div className="absolute top-1/2 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#89F336]/5 blur-[200px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-bold tracking-widest text-[#1a7c37] uppercase dark:text-[#89F336]">
            Preços
          </h2>
          <p className="mt-4 text-4xl font-bold tracking-tighter text-gray-900 md:text-5xl dark:text-white">
            Escolha o plano ideal para seu time
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
            Comece de graça e evolua conforme sua empresa cresce. Sem pegadinhas, sem burocracia.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className={`relative flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20 ${
                plan.isFeatured
                  ? "border-2 border-[#1a7c37]/50 shadow-2xl shadow-[#1a7c37]/10 dark:border-[#89F336] dark:shadow-[#89F336]/20"
                  : ""
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex items-center rounded-full bg-[#1a7c37] px-4 py-1 text-sm font-bold text-white dark:bg-[#89F336] dark:text-[#0B0C10]">
                    Mais Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-base text-gray-500 dark:text-[#9A9A9A]">
                  {plan.frequency}
                </span>
              </p>
              <p className="mt-4 text-base text-gray-500 dark:text-[#9A9A9A]">{plan.description}</p>

              <div className="my-8 w-full border-t border-gray-200 dark:border-white/10"></div>

              <ul className="grow space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#1a7c37] dark:text-[#89F336]" strokeWidth={3} />
                    <span className="text-sm text-gray-700 dark:text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-10 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-lg font-bold transition-all duration-300 active:scale-95 ${
                  plan.isFeatured
                    ? "bg-[#89F336] text-[#0B0C10] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] hover:bg-[#9EFF55]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                }`}
              >
                {plan.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
