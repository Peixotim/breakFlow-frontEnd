import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#121214] text-[#EDEDED] selection:bg-[#89F336]/30">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#89F336]/10 blur-[120px]" />

      <div className="animate-in fade-in zoom-in relative z-10 flex flex-col items-center px-4 text-center duration-700">
        <div className="group relative mb-8">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_-10px_rgba(137,243,54,0.2)] backdrop-blur-xl transition-all duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(137,243,54,0.4)]">
            <Coffee
              className="h-20 w-20 animate-bounce text-[#89F336] drop-shadow-[0_0_15px_rgba(137,243,54,0.5)]"
              strokeWidth={1.5}
            />
          </div>

          <div className="absolute -top-2 -right-2 flex rotate-12 items-center gap-1 rounded-full border border-[#89F336]/30 bg-[#18181B] px-3 py-1 text-xs font-bold text-[#89F336] shadow-lg">
            <SearchX className="h-3 w-3" /> 404
          </div>
        </div>
        <h1 className="mb-4 text-7xl font-extrabold tracking-tighter text-white drop-shadow-xl">
          4<span className="text-[#89F336]">0</span>4
        </h1>

        <h2 className="mb-4 text-2xl font-bold text-[#EDEDED] md:text-3xl">Pausa não planejada?</h2>

        <p className="mb-10 max-w-md text-lg leading-relaxed text-[#9A9A9A]">
          Parece que a página que você procura
          <span className="font-semibold text-[#89F336]"> saiu para o almoço </span>e esqueceu de
          bater o ponto de volta.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-full bg-[#89F336] px-8 text-lg font-bold text-[#0B0C10] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] transition-all duration-300 hover:bg-[#9EFF55] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]"
          >
            <Link href="/dashboard">Voltar ao Fluxo</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="h-12 rounded-full px-8 font-medium text-[#9A9A9A] hover:bg-white/5 hover:text-white"
          >
            <Link href="/login" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Ir para Login
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 text-[10px] font-bold tracking-[0.2em] text-[#9A9A9A] uppercase opacity-30">
        ERROR 404 • PAGE NOT FOUND
      </div>
    </div>
  );
}
