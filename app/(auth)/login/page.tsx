"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Loader2,
  ArrowRight,
  Mail,
  Lock,
  User,
  FileText,
  CheckCircle2,
  Building,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { validateCPF, validateCNPJ } from "@/lib/validator";

export default function AuthPage() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    cpf: "",
    companyCnpj: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length === 0) return;

    if (name === "cpf") {
      if (!validateCPF(value)) {
        toast.error("CPF Inválido", {
          description: "Por favor, verifique o número digitado.",
          style: { background: "#222", color: "white", border: "1px solid #555" },
        });
      }
    }
    if (name === "companyCnpj") {
      if (!validateCNPJ(value)) {
        toast.error("CNPJ da Empresa Inválido", {
          description: "Verifique o CNPJ da empresa informada.",
          style: { background: "#222", color: "white", border: "1px solid #555" },
        });
      }
    }
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
      toast.error("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }
    if (!validateCPF(employeeData.cpf)) {
      toast.error("Seu CPF é inválido. Por favor, corrija.");
      setIsLoading(false);
      return;
    }
    if (!validateCNPJ(employeeData.companyCnpj)) {
      toast.error("O CNPJ da empresa é inválido. Por favor, corrija.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Conta criada! Redirecionando para o login...");
      setTimeout(() => setIsRegisterMode(false), 1500);
    }, 2000);
  };

  const overlayVariants = {
    login: { x: "0%" },
    register: { x: "100%" },
  };
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 text-gray-900 selection:bg-[#89F336]/30 dark:bg-[#121214] dark:text-[#EDEDED]">
      <Toaster position="bottom-right" richColors theme="dark" />

      <div className="relative h-screen w-full overflow-hidden lg:flex">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>
        <div className="absolute top-8 right-8 z-30">
          <ThemeToggle />
        </div>

        <div
          className={`absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center p-8 transition-all duration-500 lg:w-1/2 ${isRegisterMode ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
        >
          <div className="w-full max-w-[420px]">
            <div className="mb-6 text-center lg:text-left">
              <h2 className="mb-2 bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-[#89F336] dark:to-white">
                Conta Funcionário
              </h2>
              <p className="text-sm text-gray-500 dark:text-[#888888]">
                Junte-se ao time BreakFlow.
              </p>
            </div>
            <AnimatePresence>
              {error && isRegisterMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleEmployeeRegister} className="space-y-3 overflow-visible">
              <InputGroup
                icon={<User />}
                placeholder="Seu Nome Completo"
                name="name"
                value={employeeData.name}
                onChange={handleEmployeeChange}
                label="Nome"
              />
              <InputGroup
                icon={<Building />}
                placeholder="CNPJ da sua Empresa"
                name="companyCnpj"
                value={employeeData.companyCnpj}
                onChange={handleEmployeeChange}
                label="CNPJ da Empresa"
                onBlur={handleBlur}
              />
              <InputGroup
                icon={<FileText />}
                placeholder="Seu CPF (só números)"
                name="cpf"
                value={employeeData.cpf}
                onChange={handleEmployeeChange}
                label="CPF"
                onBlur={handleBlur}
              />

              <InputGroup
                icon={<Mail />}
                placeholder="seu@email.com"
                name="email"
                value={employeeData.email}
                onChange={handleEmployeeChange}
                label="Email"
                type="email"
              />

              <div className="grid grid-cols-2 gap-3">
                <InputGroup
                  icon={<Lock />}
                  placeholder="Senha"
                  name="password"
                  value={employeeData.password}
                  onChange={handleEmployeeChange}
                  label="Senha"
                  type="password"
                />
                <InputGroup
                  icon={<CheckCircle2 />}
                  placeholder="Confirmar"
                  name="confirmPassword"
                  value={employeeData.confirmPassword}
                  onChange={handleEmployeeChange}
                  label="Confirmar"
                  type="password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#89F336] text-lg font-bold text-[#0B0C10] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] transition-all hover:bg-[#9EFF55] active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Cadastrar-se"}
              </button>
            </form>

            <div className="mt-4 text-center lg:hidden">
              <button
                onClick={() => setIsRegisterMode(false)}
                className="text-sm font-bold text-[#1a7c37] underline dark:text-[#89F336]"
              >
                Voltar para Login
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-0 right-0 flex h-full w-full flex-col items-center justify-center p-8 transition-all duration-500 lg:w-1/2 ${!isRegisterMode ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
        >
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
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-5 overflow-visible">
              <InputGroup
                icon={<Mail />}
                placeholder="seu@email.com"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                label="Email Corporativo"
                type="email"
              />
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
                    name="password"
                    placeholder="••••••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1a7c37] text-[17px] font-bold text-white shadow-lg shadow-[#1a7c37]/30 transition-all duration-200 hover:bg-[#14632b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#89F336] dark:text-[#0B0C10] dark:shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] dark:hover:bg-[#9EFF55] dark:hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)]"
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

            <div className="mt-10 text-center lg:hidden">
              <p className="text-sm font-medium text-gray-500 dark:text-[#666]">
                É um funcionário novo?{" "}
                <button
                  onClick={() => setIsRegisterMode(true)}
                  className="font-bold text-[#1a7c37] hover:underline dark:text-[#89F336]"
                >
                  Ativar sua conta
                </button>
              </p>
            </div>

            {!isRegisterMode && (
              <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-white/10">
                <p className="mb-4 text-sm text-gray-500 dark:text-[#888888]">
                  É gestor e quer contratar o BreakFlow?
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1a7c37] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1a7c37]/20 transition-all hover:scale-105 hover:bg-[#14632b] active:scale-95 dark:bg-white dark:text-[#0B0C10] dark:shadow-white/20 dark:hover:bg-gray-200"
                >
                  <Building className="h-4 w-4" />
                  Cadastrar Minha Empresa
                </Link>
              </div>
            )}
          </div>
        </div>
        <motion.div
          initial={false}
          animate={isRegisterMode ? "register" : "login"}
          variants={overlayVariants}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
          className="animate-gradient absolute top-0 left-0 z-20 hidden h-full w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-[#89F336] via-[#1a7c37] to-[#89F336] lg:flex"
        >
          <div className="relative z-10 max-w-md rounded-[2.5rem] border border-white/20 bg-white/10 p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              {!isRegisterMode ? (
                <motion.div
                  key="login-text"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-tr from-[#89F336] to-[#9EFF55] text-4xl shadow-2xl shadow-[#89F336]/30">
                    🥑
                  </div>
                  <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                    BreakFlow
                  </h1>
                  <p className="mb-6 text-lg leading-relaxed font-medium text-white/90">
                    Ainda não faz parte do time?
                  </p>
                  <button
                    onClick={() => setIsRegisterMode(true)}
                    className="rounded-full border border-white/30 bg-white/20 px-8 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30"
                  >
                    Criar conta de Funcionário
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="register-text"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/30 bg-white/20 text-4xl shadow-2xl">
                    👋
                  </div>
                  <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                    Bem-vindo!
                  </h1>
                  <p className="mb-8 text-lg leading-relaxed font-medium text-white/90">
                    Já possui credenciais? Volte para acessar seu painel.
                  </p>
                  <button
                    onClick={() => setIsRegisterMode(false)}
                    className="rounded-full border border-white/30 bg-white/20 px-8 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30"
                  >
                    Voltar para Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-6 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase opacity-30 dark:text-[#9A9A9A]">
        BreakFlow Security System © 2025
      </div>
    </div>
  );
}

const InputGroup = ({
  icon,
  label,
  ...props
}: {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
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
