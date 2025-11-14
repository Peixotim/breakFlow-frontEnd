"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function PrimeirosPassosPage() {
  
  // 1. ANIMAÇÃO INTERATIVA: Barra de Progresso de Leitura
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden 
                    bg-gray-50 dark:bg-[#121214] 
                    text-gray-900 dark:text-[#EDEDED] 
                    selection:bg-[#89F336]/30">
      
      {/* HEADER FIXO */}
      <Header />

      {/* BARRA DE PROGRESSO DE LEITURA (O "DIFERENCIAL") */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#89F336] z-50 origin-[0%]" 
        style={{ scaleX }} 
      />

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="relative w-full max-w-4xl mx-auto px-4 pt-40 pb-24">
        
        {/* Background FX (Grid sutil) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none z-0"></div>

        {/* HERO DA PÁGINA */}
        <motion.div 
          className="relative z-10 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center 
                          rounded-2xl bg-green-700/10 dark:bg-[#89F336]/10 
                          border border-green-700/20 dark:border-[#89F336]/20 
                          text-green-700 dark:text-[#89F336] shadow-inner mb-6">
            <Rocket className="w-8 h-8" strokeWidth={2} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">
            Primeiros Passos
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-[#9A9A9A] leading-relaxed">
            Configure sua organização e coloque o BreakFlow para rodar em 
            menos de 5 minutos.
          </p>
        </motion.div>

        {/* CONTEÚDO DO ARTIGO */}
        <motion.article 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <H2 id="passo-1">Passo 1: Criando sua Conta (Empresa)</H2>
          <P>
            Tudo começa na nossa página de <A href="/register">cadastro</A>. 
            Diferente de outros apps, seu primeiro cadastro já cria dois registros
            essenciais em uma única transação:
          </P>
          <Ul>
            <Li><strong>Sua Empresa (Tenant):</strong> O contêiner principal que guarda todos os seus dados.</Li>
            <Li><strong>Sua Conta (Owner):</strong> O primeiro usuário administrador, que tem permissão total.</Li>
          </Ul>
          <P>
            Você precisará do seu <Code>CNPJ</Code> e <Code>CPF</Code> para garantir
            a segurança e unicidade da conta.
          </P>

          <H2 id="passo-2">Passo 2: Criando seu Primeiro Evento de Pausa</H2>
          <P>
            Após o login, a primeira coisa a fazer é definir suas regras. O BreakFlow não
            controla pessoas, ele controla vagas.
          </P>
          <P>
            Vá para a aba <strong>Eventos</strong> no seu dashboard e clique em Criar Novo.
            Um bom começo é criar dois eventos:
          </P>
          <CodeBlock>
            {`// Evento 1: Almoço
Nome: "Pausa para Almoço"
Limite de Vagas: 20
Duração Máxima: 60 minutos

// Evento 2: Café
Nome: "Pausa para o Café"
Limite de Vagas: 5
Duração Máxima: 15 minutos`}
          </CodeBlock>
          <P>
            O <Code>Limite de Vagas</Code> é o coração do BreakFlow. É ele que garante que
            nunca haverá mais de 20 pessoas (no caso do almoço) fora ao mesmo tempo.
          </P>

          <H2 id="passo-3">Passo 3: Convidando seu Time</H2>
          <P>
            Com as regras prontas, é hora de trazer a equipe. Vá para a aba <strong>Usuários</strong> e
            clique em Convidar Funcionário.
          </P>
          <P>
            Você só precisa do email de cada um. O BreakFlow enviará um convite mágico
            para que eles criem suas próprias senhas e se vinculem automaticamente à sua empresa.
          </P>

          <NextStep 
            title="Convidando seu Time"
            href="/docs/convidando-time"
          />
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}


const H1 = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4 mt-2" {...props}>
    {children}
  </h1>
);

const H2 = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 
    className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4 mt-12 border-b border-gray-200 dark:border-white/10 pb-4"
    {...props}
  >
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-gray-600 dark:text-[#9A9A9A] leading-relaxed mb-6">
    {children}
  </p>
);

const Ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
    {children}
  </ul>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="text-lg text-gray-600 dark:text-[#9A9A9A] marker:text-primary">
    {children}
  </li>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-[#18181B] border border-white/10 rounded-xl p-4 my-6 overflow-x-auto">
    <code className="font-mono text-sm text-white/80">
      {children}
    </code>
  </pre>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-200 dark:bg-[#18181B] text-primary px-1.5 py-0.5 rounded-md border border-gray-300 dark:border-white/10 font-mono text-sm">
    {children}
  </code>
);

const A = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="font-medium text-primary hover:underline">
    {children}
  </Link>
);

const NextStep = ({ title, href }: { title: string; href: string }) => (
  <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/5 shadow-lg
                  hover:shadow-2xl hover:dark:shadow-primary/20 hover:border-gray-300 dark:hover:border-primary/30
                  transition-all duration-300">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Próximo Passo</h3>
    <p className="mt-2 text-base text-gray-600 dark:text-[#9A9A9A]">
      Continue aprendendo sobre como {title.toLowerCase()}.
    </p>
    <Link 
      href={href} 
      className="inline-flex items-center gap-2 mt-4 font-bold text-primary group"
    >
      Guia: {title} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);