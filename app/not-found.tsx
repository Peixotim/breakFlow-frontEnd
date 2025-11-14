import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#121214] text-[#EDEDED] selection:bg-[#89F336]/30">

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#89F336]/10 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-700">
        
        <div className="relative mb-8 group">
          <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(137,243,54,0.2)] group-hover:shadow-[0_0_60px_-10px_rgba(137,243,54,0.4)] transition-all duration-500">
            <Coffee className="w-20 h-20 text-[#89F336] drop-shadow-[0_0_15px_rgba(137,243,54,0.5)] animate-bounce" strokeWidth={1.5} />
          </div>
          
          <div className="absolute -top-2 -right-2 bg-[#18181B] border border-[#89F336]/30 text-[#89F336] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg rotate-12">
            <SearchX className="w-3 h-3" /> 404
          </div>
        </div>
        <h1 className="text-7xl font-extrabold text-white mb-4 tracking-tighter drop-shadow-xl">
          4<span className="text-[#89F336]">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#EDEDED] mb-4">
          Pausa não planejada?
        </h2>
        
        <p className="text-[#9A9A9A] text-lg max-w-md mb-10 leading-relaxed">
          Parece que a página que você procura 
          <span className="text-[#89F336] font-semibold"> saiu para o almoço </span> 
          e esqueceu de bater o ponto de volta.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button 
            asChild
            className="h-12 px-8 rounded-full font-bold text-lg text-[#0B0C10]
                       bg-[#89F336] hover:bg-[#9EFF55] 
                       shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]
                       transition-all duration-300"
          >
            <Link href="/dashboard">
              Voltar ao Fluxo
            </Link>
          </Button>

          <Button 
            asChild
            variant="ghost"
            className="h-12 px-8 rounded-full font-medium text-[#9A9A9A] hover:text-white hover:bg-white/5"
          >
            <Link href="/login" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Ir para Login
            </Link>
          </Button>
        </div>

      </div>
      <div className="absolute bottom-8 text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 text-[#9A9A9A]">
        ERROR 404 • PAGE NOT FOUND
      </div>
    </div>
  );
}