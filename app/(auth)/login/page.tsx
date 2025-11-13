"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Loader2, ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div
      className={`flex min-h-screen w-full overflow-hidden bg-gray-50 text-gray-900 selection:bg-[#89F336]/30 dark:bg-[#121214] dark:text-[#EDEDED]`}
    >
      <div className="animate-gradient relative hidden w-[47%] items-center justify-center overflow-hidden bg-linear-to-br from-[#89F336] via-[#1a7c37] to-[#89F336] lg:flex">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <div className="absolute top-[-20%] left-[-20%] h-[800px] w-[800px] animate-pulse rounded-full bg-[#89F336] opacity-30 blur-[120px] filter" />
          <div className="absolute right-[-20%] bottom-[-20%] h-[600px] w-[600px] animate-pulse rounded-full bg-[#89F336] opacity-30 blur-[100px] filter delay-1000" />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        <div className="relative z-10 max-w-md rounded-[2.5rem] border border-white/20 bg-white/10 p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-tr from-[#89F336] to-[#9EFF55] text-4xl shadow-2xl shadow-[#89F336]/30">
            🥑
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            BreakFlow
          </h1>
          <p className="text-lg leading-relaxed font-medium text-white/90">
            Produtividade fluida para times modernos.
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center bg-gray-50 p-8 transition-colors duration-500 lg:w-[53%] dark:bg-[#121214]">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>
        <div className="absolute top-8 right-8 z-20">
          <ThemeToggle />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 z-10 w-full max-w-[420px] duration-700">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="animate-text-shimmer mb-3 bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-[#89F336] dark:to-white">
              Bem-vindo de volta
            </h2>
            <p className="text-lg text-gray-500 dark:text-[#888888]">
              Acesse o painel para gerenciar sua equipe.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group space-y-2">
              <label className="ml-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
                Email Corporativo
              </label>
              <div className="relative transition-all duration-300 group-focus-within:scale-[1.01]">
                <div className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="/* Light Mode Styles */ /* Dark Mode Styles */ h-14 w-full rounded-2xl border border-gray-200 bg-white pr-6 pl-14 text-base font-medium text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 hover:border-gray-300 hover:bg-gray-50 focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10 dark:border-white/5 dark:bg-[#18181B] dark:text-white dark:shadow-black/20 dark:placeholder:text-[#444] dark:hover:border-white/10 dark:hover:bg-[#1E1E22] dark:focus:border-[#89F336]/50 dark:focus:bg-[#18181B] dark:focus:ring-[#89F336]/10"
                  required
                />
              </div>
            </div>
            <div className="group space-y-2">
              <div className="mr-2 ml-4 flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
                  Senha
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-[#1a7c37] transition-colors hover:text-green-700 dark:text-[#89F336] dark:hover:text-[#B4FF75]"
                >
                  Recuperar senha
                </Link>
              </div>
              <div className="relative transition-all duration-300 group-focus-within:scale-[1.01]">
                <div className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="/* Light Mode Styles */ /* Dark Mode Styles */ h-14 w-full rounded-2xl border border-gray-200 bg-white pr-6 pl-14 text-base font-medium text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 hover:border-gray-300 hover:bg-gray-50 focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10 dark:border-white/5 dark:bg-[#18181B] dark:text-white dark:shadow-black/20 dark:placeholder:text-[#444] dark:hover:border-white/10 dark:hover:bg-[#1E1E22] dark:focus:border-[#89F336]/50 dark:focus:bg-[#18181B] dark:focus:ring-[#89F336]/10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="/* Light Mode */ /* Dark Mode (Neon) */ mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1a7c37] text-[17px] font-bold text-white shadow-lg shadow-[#1a7c37]/30 transition-all duration-200 hover:bg-[#14632b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#89F336] dark:text-[#0B0C10] dark:shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] dark:hover:bg-[#9EFF55] dark:hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Acessar Painel <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-[#666]">
              Novo por aqui?{" "}
              <Link
                href="/cadastro"
                className="font-bold text-[#1a7c37] decoration-2 underline-offset-4 transition-all hover:text-green-700 hover:underline dark:text-[#89F336] dark:hover:text-[#B4FF75]"
              >
                Criar conta corporativa
              </Link>
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase opacity-40 dark:text-[#9A9A9A]">
          BreakFlow Security System © 2025
        </div>
      </div>
    </div>
  );
}
