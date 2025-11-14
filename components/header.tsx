"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

export function Header() {
  return (
    // 1. O 'header' flutua no centro
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      
      {/* 2. O 'div' é a pílula. 
          MUDANÇA: h-12 -> h-14 (56px) para mais "gordura"
          MUDANÇA: gap-4 -> gap-6 e px-4 -> px-6 para mais "ar"
      */}
      <div
        className={cn(
          "flex h-14 items-center gap-6 rounded-full px-6 text-sm font-medium",
          "border shadow-lg backdrop-blur-xl", // Efeito Glass
          "bg-white/50 dark:bg-[#121214]/50", // Cor do vidro
          "border-gray-200/50 dark:border-white/10", // Borda sutil
          "shadow-black/5"
        )}
      >
        {/* Logo (um pouco maior) */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* CORREÇÃO DE TYPO: 'bg-linear-to-tr' -> 'bg-gradient-to-tr' */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#89F336] to-[#9EFF55] text-xl font-bold">
            🥑
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            BreakFlow
          </span>
        </Link>

        {/* Divisor (um pouco maior) */}
        <div className="h-7 w-px bg-gray-300 dark:bg-white/10" />

        {/* Navegação (com mais espaçamento) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-600 dark:text-[#9A9A9A] hover:text-gray-900 dark:hover:text-white transition-colors">
            Funcionalidades
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 dark:text-[#9A9A9A] hover:text-gray-900 dark:hover:text-white transition-colors">
            Preços
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-600 dark:text-[#9A9A9A] hover:text-gray-900 dark:hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        {/* Ações (Direita) (botões um pouco maiores) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            asChild 
            variant="ghost" 
            className="rounded-full h-10 px-4 text-gray-600 dark:text-[#9A9A9A] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            asChild
            className="rounded-full h-10 px-5 font-bold 
                       text-white bg-[#1a7c37] hover:bg-[#14632b] shadow-lg shadow-[#1a7c37]/30
                       dark:text-[#0B0C10] dark:bg-[#89F336] dark:hover:bg-[#9EFF55] dark:shadow-[0_0_15px_-5px_rgba(137,243,54,0.4)]
                       transition-all"
          >
            <Link href="/register">Cadastrar Empresa</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}