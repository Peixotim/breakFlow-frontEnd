import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut, LayoutDashboard } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#121214] text-[#EDEDED] selection:bg-[#89F336]/30">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>

      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#89F336]/5 blur-[150px]" />

      <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 flex flex-col items-center px-4 text-center duration-700">
        <div className="group relative mb-8">
          <div className="flex h-32 w-32 items-center justify-center rounded-4xl border border-white/10 bg-white/5 shadow-[0_0_40px_-10px_rgba(137,243,54,0.1)] backdrop-blur-xl transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(137,243,54,0.3)]">
            <ShieldAlert
              className="h-14 w-14 text-[#89F336] drop-shadow-[0_0_15px_rgba(137,243,54,0.5)] group-hover:animate-[spin_0.5s_ease-in-out_reverse]"
              strokeWidth={1.5}
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[#89F336]/20 bg-[#18181B] px-3 py-1 text-[10px] font-bold tracking-widest text-[#89F336] uppercase shadow-lg">
            Acesso Negado
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Área Restrita
        </h1>

        <p className="mb-10 max-w-md text-lg leading-relaxed text-[#9A9A9A]">
          Ops! Seu crachá não tem permissão para abrir esta porta. Esta área é reservada para
          administradores.
        </p>

        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-[#89F336] px-8 text-lg font-bold text-[#0B0C10] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] transition-all duration-300 hover:bg-[#9EFF55] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)] sm:w-auto"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Voltar ao Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-12 w-full rounded-full border border-transparent px-8 font-medium text-[#9A9A9A] hover:border-white/10 hover:bg-white/5 hover:text-white sm:w-auto"
          >
            <Link href="/login" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Entrar com outra conta
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 text-[10px] font-bold tracking-[0.2em] text-[#9A9A9A] uppercase opacity-30">
        ERROR 401 / 403 • UNAUTHORIZED ACCESS
      </div>
    </div>
  );
}
