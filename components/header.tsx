"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          "flex h-14 items-center gap-6 rounded-full px-6 text-sm font-medium",
          "border shadow-lg backdrop-blur-xl",
          "bg-white/50 dark:bg-[#121214]/50",
          "border-gray-200/50 dark:border-white/10",
          "shadow-black/5"
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-tr from-[#89F336] to-[#9EFF55] text-xl font-bold">
            🥑
          </div>
          <span className="hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
            BreakFlow
          </span>
        </Link>

        <div className="h-7 w-px bg-gray-300 dark:bg-white/10" />
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:text-white"
          >
            Funcionalidades
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:text-white"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            className="h-10 rounded-full px-4 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:bg-white/5 dark:hover:text-white"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="h-10 rounded-full bg-[#1a7c37] px-5 font-bold text-white shadow-lg shadow-[#1a7c37]/30 transition-all hover:bg-[#14632b] dark:bg-[#89F336] dark:text-[#0B0C10] dark:shadow-[0_0_15px_-5px_rgba(137,243,54,0.4)] dark:hover:bg-[#9EFF55]"
          >
            <Link href="/register">Cadastrar Empresa</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
