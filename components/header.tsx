"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between p-4
                      border border-white/5 bg-black/30 backdrop-blur-xl
                      rounded-full mt-4 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#89F336] to-[#9EFF55] flex items-center justify-center text-lg font-bold">
            🥑
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">
            BreakFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
            Funcionalidades
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
            Preços
          </Link>
          <Link href="/blog" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            asChild 
            variant="ghost" 
            className="rounded-full h-9 px-4 text-[#9A9A9A] hover:text-white hover:bg-white/5"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            asChild
            className="rounded-full h-9 px-5 font-bold text-[#0B0C10]
                       bg-[#89F336] hover:bg-[#9EFF55]
                       shadow-[0_0_15px_-5px_rgba(137,243,54,0.4)]
                       transition-all"
          >
            <Link href="/register">Cadastrar Empresa</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}