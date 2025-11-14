"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Loader2, ArrowRight, Mail, Lock, User, FileText, CheckCircle2, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleEmployeeRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (employeeData.password !== employeeData.confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsRegisterMode(false); 
    }, 2000);
  };


  const overlayVariants = {
    login: { x: "0%" },
    register: { x: "100%" },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50 text-gray-900 selection:bg-[#89F336]/30 dark:bg-[#121214] dark:text-[#EDEDED]">
      
      {/* Container Principal */}
      <div className="relative w-full h-screen lg:flex overflow-hidden">

        {/* BACKGROUND FX (GRADES) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

        <div className="absolute top-8 right-8 z-30">
          <ThemeToggle />
        </div>

        {/* ============================================================
            CAMADA 1: OS FORMULÁRIOS (FICAM POR BAIXO)
           ============================================================ */}

        {/* --- ESQUERDA: FORMULÁRIO DE CADASTRO DE FUNCIONÁRIO --- */}
        <div className={`absolute top-0 left-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-500 ${isRegisterMode ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
           <div className="w-full max-w-[420px]">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 dark:from-white dark:via-[#89F336] dark:to-white">
                  Conta Funcionário
                </h2>
                <p className="text-sm text-gray-500 dark:text-[#888888]">Preencha seus dados para entrar no time.</p>
              </div>

              <AnimatePresence>
                {error && isRegisterMode && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-4 text-sm text-center">
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleEmployeeRegister} className="space-y-3 overflow-visible">
                <InputGroup icon={<User />} placeholder="Seu Nome Completo" name="name" value={employeeData.name} onChange={handleEmployeeChange} label="Nome" />
                <InputGroup icon={<FileText />} placeholder="000.000.000-00" name="cpf" value={employeeData.cpf} onChange={handleEmployeeChange} label="CPF" />
                <InputGroup icon={<Mail />} placeholder="seu@email.com" name="email" value={employeeData.email} onChange={handleEmployeeChange} label="Email" type="email" />
                
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup icon={<Lock />} placeholder="Senha" name="password" value={employeeData.password} onChange={handleEmployeeChange} label="Senha" type="password" />
                  <InputGroup icon={<CheckCircle2 />} placeholder="Confirmar" name="confirmPassword" value={employeeData.confirmPassword} onChange={handleEmployeeChange} label="Confirmar" type="password" />
                </div>

                <button type="submit" disabled={isLoading} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-bold text-lg text-[#0B0C10] bg-[#89F336] hover:bg-[#9EFF55] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] transition-all active:scale-[0.98] disabled:opacity-70">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Cadastrar-se"}
                </button>
              </form>
              
              <div className="mt-4 text-center lg:hidden">
                <button onClick={() => setIsRegisterMode(false)} className="text-[#1a7c37] dark:text-[#89F336] font-bold underline text-sm">Voltar para Login</button>
              </div>
           </div>
        </div>

        <div className={`absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-500 ${!isRegisterMode ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          
          <div className="w-full max-w-[420px]">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="animate-text-shimmer mb-3 bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-[#89F336] dark:to-white">
                Bem-vindo de volta
              </h2>
              <p className="text-lg text-gray-500 dark:text-[#888888]">
                Acesse o painel para gerenciar sua equipe.
              </p>
            </div>

            <AnimatePresence>
                {error && !isRegisterMode && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-4 text-sm text-center">
                    {error}
                  </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-5 overflow-visible">
              <InputGroup icon={<Mail />} placeholder="seu@email.com" name="email" value={loginData.email} onChange={handleLoginChange} label="Email Corporativo" type="email" />
              
              <div className="group space-y-2">
                <div className="mr-2 ml-4 flex items-center justify-between">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">Senha</label>
                  <Link href="#" className="text-xs font-bold text-[#1a7c37] transition-colors hover:text-green-700 dark:text-[#89F336] dark:hover:text-[#B4FF75]">Recuperar senha</Link>
                </div>
                <div className="relative transition-all duration-300 group-focus-within:scale-[1.01]">
                  <div className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]"><Lock className="h-5 w-5" /></div>
                  <input type="password" name="password" placeholder="••••••••••••" value={loginData.password} onChange={handleLoginChange} className="h-14 w-full rounded-2xl border border-gray-200 bg-white pr-6 pl-14 text-base font-medium text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 hover:border-gray-300 hover:bg-gray-50 focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10 dark:border-white/5 dark:bg-[#18181B] dark:text-white dark:shadow-black/20 dark:placeholder:text-[#444] dark:hover:border-white/10 dark:hover:bg-[#1E1E22] dark:focus:border-[#89F336]/50 dark:focus:bg-[#18181B] dark:focus:ring-[#89F336]/10" required />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1a7c37] text-[17px] font-bold text-white shadow-lg shadow-[#1a7c37]/30 transition-all duration-200 hover:bg-[#14632b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#89F336] dark:text-[#0B0C10] dark:shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] dark:hover:bg-[#9EFF55] dark:hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Acessar Painel <ArrowRight className="h-5 w-5" /></>}
              </button>
            </form>

            <div className="mt-10 text-center lg:hidden">
              <p className="text-sm font-medium text-gray-500 dark:text-[#666]">
                Novo por aqui? <button onClick={() => setIsRegisterMode(true)} className="font-bold text-[#1a7c37] hover:underline dark:text-[#89F336]">Criar conta</button>
              </p>
            </div>

            {/* 🟢 Link para Cadastro de Empresa (Agora ABAIXO do botão de Login) */}
            {!isRegisterMode && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center">
                <p className="text-sm text-gray-500 dark:text-[#888888] mb-3">
                  É gestor e quer contratar o BreakFlow?
                </p>
                <Link 
                  href="/register" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm 
                             text-white bg-[#1a7c37] hover:bg-[#14632b] shadow-lg shadow-[#1a7c37]/20
                             dark:text-[#0B0C10] dark:bg-[#89F336] dark:hover:bg-[#9EFF55] dark:shadow-[#89F336]/20
                             transition-all hover:scale-105 active:scale-95"
                >
                  <Building className="w-4 h-4" />
                  Cadastrar Minha Empresa
                </Link>
              </div>
            )}

          </div>
        </div>

        {/* ============================================================
            CAMADA 2: O OVERLAY DESLIZANTE (PAINEL VERDE)
           ============================================================ */}
        <motion.div 
          initial={false}
          animate={isRegisterMode ? "register" : "login"}
          variants={overlayVariants}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
          className="hidden lg:flex absolute top-0 left-0 w-1/2 h-full z-20 items-center justify-center overflow-hidden 
                     bg-linear-to-br from-[#89F336] via-[#1a7c37] to-[#89F336] animate-gradient"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <div className="absolute top-[-20%] left-[-20%] h-[800px] w-[800px] animate-pulse rounded-full bg-[#89F336] opacity-30 blur-[120px] filter" />
            <div className="absolute right-[-20%] bottom-[-20%] h-[600px] w-[600px] animate-pulse rounded-full bg-[#89F336] opacity-30 blur-[100px] filter delay-1000" />
          </div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

          {/* CONTEÚDO DO PAINEL */}
          <div className="relative z-10 max-w-md rounded-[2.5rem] border border-white/20 bg-white/10 p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl">
            
            <AnimatePresence mode="wait">
              {!isRegisterMode ? (
                // ESTADO: LOGIN (Painel na Esquerda) -> MOSTRA CONVITE P/ CADASTRO FUNCIONÁRIO
                <motion.div key="login-text" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-tr from-[#89F336] to-[#9EFF55] text-4xl shadow-2xl shadow-[#89F336]/30">🥑</div>
                  <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">BreakFlow</h1>
                  
                  <p className="text-lg leading-relaxed font-medium text-white/90 mb-6">
                    Ainda não faz parte do time?
                  </p>
                  {/* Botão que DESLIZA o painel para a direita */}
                  <button onClick={() => setIsRegisterMode(true)} className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30 backdrop-blur-md transition-all hover:scale-105 shadow-lg">
                    Criar conta de Funcionário
                  </button>
                </motion.div>
              ) : (
                
                // ESTADO: CADASTRO (Painel na Direita) -> MOSTRA CONVITE P/ LOGIN
                <motion.div key="register-text" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 border border-white/30 text-4xl shadow-2xl">👋</div>
                  <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">Bem-vindo!</h1>
                  <p className="text-lg leading-relaxed font-medium text-white/90 mb-8">
                    Já possui credenciais? Volte para acessar seu painel.
                  </p>
                  {/* Botão que DESLIZA o painel para a esquerda */}
                  <button onClick={() => setIsRegisterMode(false)} className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30 backdrop-blur-md transition-all hover:scale-105 shadow-lg">
                    Voltar para Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
      
      <div className="fixed bottom-6 text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 text-gray-500 dark:text-[#9A9A9A]">
        BreakFlow Security System © 2025
      </div>
    </div>
  );
}

// Componente de Input Reutilizável
const InputGroup = ({ icon, label, ...props }: { icon: React.ReactNode; label: string; [key: string]: any}) => (
  <div className="group space-y-2">
    <label className="ml-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
      {label}
    </label>
    <div className="relative transition-all duration-300 group-focus-within:scale-[1.01]">
      <div className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1a7c37] dark:text-[#666666] dark:group-focus-within:text-[#89F336]">
        {icon}
      </div>
      <input
        {...props}
        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pr-6 pl-14 text-base font-medium text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 hover:border-gray-300 hover:bg-gray-50 focus:border-[#1a7c37] focus:ring-4 focus:ring-[#1a7c37]/10 dark:border-white/5 dark:bg-[#18181B] dark:text-white dark:shadow-black/20 dark:placeholder:text-[#444] dark:hover:border-white/10 dark:hover:bg-[#1E1E22] dark:focus:border-[#89F336]/50 dark:focus:bg-[#18181B] dark:focus:ring-[#89F336]/10"
        required
      />
    </div>
  </div>
);