import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut, LayoutDashboard } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#121214] text-[#EDEDED] selection:bg-[#89F336]/30">
      

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>


      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#89F336]/5 rounded-full blur-[150px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <div className="relative mb-8 group">

          <div className="w-32 h-32 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(137,243,54,0.1)] group-hover:shadow-[0_0_50px_-10px_rgba(137,243,54,0.3)] transition-all duration-500">

            <ShieldAlert 
              className="w-14 h-14 text-[#89F336] drop-shadow-[0_0_15px_rgba(137,243,54,0.5)] group-hover:animate-[spin_0.5s_ease-in-out_reverse]" 
              strokeWidth={1.5} 
            />
          </div>
      
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#18181B] border border-[#89F336]/20 text-[#89F336] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
            Acesso Negado
          </div>
        </div>


        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Área Restrita
        </h1>
        
        <p className="text-[#9A9A9A] text-lg max-w-md mb-10 leading-relaxed">
          Ops! Seu crachá não tem permissão para abrir esta porta. 
          Esta área é reservada para administradores.
        </p>


        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button 
            asChild
            className="h-12 w-full sm:w-auto px-8 rounded-full font-bold text-lg text-[#0B0C10]
                       bg-[#89F336] hover:bg-[#9EFF55] 
                       shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]
                       transition-all duration-300"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
          <Button 
            asChild
            variant="ghost"
            className="h-12 w-full sm:w-auto px-8 rounded-full font-medium text-[#9A9A9A] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <Link href="/login" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Entrar com outra conta
            </Link>
          </Button>
        </div>

      </div>
      <div className="absolute bottom-8 text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 text-[#9A9A9A]">
        ERROR 401 / 403 • UNAUTHORIZED ACCESS
      </div>
    </div>
  );
}