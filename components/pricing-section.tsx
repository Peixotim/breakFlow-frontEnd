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
    href: "/register"
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
    href: "/register-pro"
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
    href: "/contato"
  },
];

export function PricingSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-gray-50 dark:bg-[#121214] overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] 
                      bg-[#89F336]/5 rounded-full blur-[200px] 
                      animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

      <div className="container mx-auto max-w-7xl px-4 z-10 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest
                         text-[#1a7c37] dark:text-[#89F336]">
            Preços
          </h2>
          <p className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter 
                        text-gray-900 dark:text-white">
            Escolha o plano ideal para seu time
          </p>
          <p className="mt-6 text-lg text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
            Comece de graça e evolua conforme sua empresa cresce. 
            Sem pegadinhas, sem burocracia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
              className={`relative flex flex-col p-8 rounded-3xl 
                         bg-white dark:bg-[#18181B] 
                         border border-gray-200 dark:border-white/5 
                         shadow-xl dark:shadow-black/20
                         ${plan.isFeatured 
                           ? "border-2 border-[#1a7c37]/50 dark:border-[#89F336] shadow-2xl shadow-[#1a7c37]/10 dark:shadow-[#89F336]/20" 
                           : ""
                         }`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-bold 
                                   bg-[#1a7c37] text-white
                                   dark:bg-[#89F336] dark:text-[#0B0C10]">
                    Mais Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-base text-gray-500 dark:text-[#9A9A9A]">{plan.frequency}</span>
              </p>
              <p className="mt-4 text-base text-gray-500 dark:text-[#9A9A9A]">{plan.description}</p>
              
              <div className="my-8 w-full border-t border-gray-200 dark:border-white/10"></div>

              <ul className="space-y-4 grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#1a7c37] dark:text-[#89F336]" strokeWidth={3} />
                    <span className="text-sm text-gray-700 dark:text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.href}
                className={`w-full h-12 mt-10 rounded-xl font-bold text-lg 
                            transition-all duration-300 active:scale-95
                            flex items-center justify-center gap-2
                            ${plan.isFeatured 
                              ? "text-[#0B0C10] bg-[#89F336] hover:bg-[#9EFF55] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)]" 
                              : "text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-white/5 dark:hover:bg-white/10"
                            }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}