"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Building,
  User,
  FileText,
  Check,
  Info,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { registerEnterprise } from "@/lib/api";

interface FormData {
  companyName: string;
  cnpj: string;
  name: string;
  mail: string;
  cpf: string;
  password: string;
}

interface ToastState {
  message: string;
  type: "error" | "success" | "warning";
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [step, setStep] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(0.5);
  const [invalidFields, setInvalidFields] = useState<{ cpf: boolean; cnpj: boolean }>({ cpf: false, cnpj: false });

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    cnpj: "",
    name: "",
    mail: "",
    cpf: "",
    password: "",
  });

  // 🌈 animação de fundo
  useEffect(() => {
    const interval = setInterval(() => {
      setBgOpacity((prev) => (prev >= 0.9 ? 0.4 : prev + 0.02));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // ---------- FORMATADORES ----------
  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
      .slice(0, 14);
  };

  // ---------- VALIDAÇÃO CPF / CNPJ ----------
  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros[tamanho - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos[0])) return false;
    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros[tamanho - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos[1]);
  };

  // ---------- HANDLERS ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") formattedValue = formatCNPJ(value);
    if (name === "cpf") formattedValue = formatCPF(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (name === "cnpj") {
      setInvalidFields((prev) => ({ ...prev, cnpj: !validarCNPJ(formattedValue) && formattedValue.length === 18 }));
    }
    if (name === "cpf") {
      setInvalidFields((prev) => ({ ...prev, cpf: !validarCPF(formattedValue) && formattedValue.length === 14 }));
    }
  };

  const showToast = (message: string, type: ToastState["type"] = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const nextStep = () => {
    if (!formData.companyName || !formData.cnpj) {
      showToast("Preencha todos os campos antes de continuar!", "warning");
      return;
    }
    if (!validarCNPJ(formData.cnpj)) {
      showToast("CNPJ inválido! Corrija antes de prosseguir.", "error");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mail || !formData.cpf || !formData.password) {
      showToast("Preencha todos os campos para finalizar!", "warning");
      return;
    }
    if (!validarCPF(formData.cpf)) {
      showToast("CPF inválido! Corrija antes de enviar o cadastro.", "error");
      return;
    }

    setIsLoading(true);
    const payload = {
      enterprise: {
        companyName: formData.companyName,
        cnpj: formData.cnpj.replace(/\D/g, ""),
        numberOfEmployees: 1,
        numberOfSectors: 1,
        contactMail: formData.mail,
      },
      owner: {
        name: formData.name,
        mail: formData.mail,
        cpf: formData.cpf.replace(/\D/g, ""),
        password: formData.password,
        role: "OWNER" as const,
      },
    };

    try {
      await registerEnterprise(payload);
      showToast("Conta criada com sucesso! Redirecionando...", "success");
      await new Promise((res) => setTimeout(res, 1800));
      router.push("/dashboard?status=registered");
    } catch {
      showToast("Erro ao registrar. Tente novamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- ANIMAÇÕES ----------
  const fadeItem: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" },
    }),
  };

  const variants: Variants = {
    hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -80, filter: "blur(6px)", transition: { duration: 0.4 } },
  };

  const toastColors = {
    error: "bg-red-600 dark:bg-red-500",
    success: "bg-green-600 dark:bg-[#89F336]",
    warning: "bg-yellow-500 dark:bg-yellow-400",
  };

  // ---------- JSX ----------
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#121214] text-gray-900 dark:text-[#EDEDED] relative overflow-hidden"
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-6 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold text-white ${toastColors[toast.type]}`}
          >
            <Info className="w-5 h-5" /> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fundo dinâmico */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: bgOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              step === 1
                ? "radial-gradient(circle at center, rgba(26,124,55,0.18), transparent 70%)"
                : "radial-gradient(circle at center, rgba(137,243,54,0.25), transparent 70%)",
          }}
        />
      </AnimatePresence>

      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        key={`container-${step}`}
        className="relative z-10 w-full max-w-xl p-10 sm:p-12 bg-white/70 dark:bg-[#18181B]/80 backdrop-blur-2xl border border-gray-200 dark:border-white/5 shadow-2xl rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 dark:from-white dark:via-[#89F336] dark:to-white animate-text-shimmer mb-3">
            Crie sua Conta BreakFlow
          </h1>
          <p className="text-gray-500 dark:text-[#888] text-lg">
            Etapa {step} de 2: {step === 1 ? "Dados da Empresa" : "Sua Conta Pessoal"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative min-h-[440px]">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                {[{ label: "Nome da Empresa", name: "companyName", icon: Building },
                  { label: "CNPJ", name: "cnpj", icon: FileText }].map((f, i) => (
                  <motion.div key={f.name} variants={fadeItem} custom={i}>
                    <label className="label-form">{f.label}</label>
                    <div className={`input-container ${invalidFields.cnpj && f.name === "cnpj" ? "border-red-500" : ""}`}>
                      <f.icon className="input-icon" />
                      <input
                        name={f.name}
                        placeholder={f.label}
                        value={formData[f.name as keyof FormData]}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </motion.div>
                ))}
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="w-full h-14 mt-6 rounded-full font-bold text-lg text-white bg-[#1a7c37] hover:bg-[#14632b] dark:text-[#0B0C10] dark:bg-[#89F336] hover:scale-[1.02] transition-all"
                >
                  Próximo <ArrowRight className="inline-block ml-2" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: "Nome", name: "name", icon: User },
                    { label: "CPF", name: "cpf", icon: FileText }].map((f) => (
                    <div key={f.name}>
                      <label className="label-form">{f.label}</label>
                      <div className={`input-container ${invalidFields.cpf && f.name === "cpf" ? "border-red-500" : ""}`}>
                        <f.icon className="input-icon" />
                        <input
                          name={f.name}
                          placeholder={f.label}
                          value={formData[f.name as keyof FormData]}
                          onChange={handleChange}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {[{ label: "Email de Acesso", name: "mail", icon: Mail },
                  { label: "Senha Forte", name: "password", icon: Lock }].map((f, i) => (
                  <motion.div key={f.name} variants={fadeItem} custom={i + 1}>
                    <label className="label-form">{f.label}</label>
                    <div className="input-container">
                      <f.icon className="input-icon" />
                      <input
                        name={f.name}
                        type={f.name === "password" ? "password" : "text"}
                        placeholder={f.label}
                        value={formData[f.name as keyof FormData]}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </motion.div>
                ))}
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={prevStep} className="w-1/3 h-14 rounded-full font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#222] dark:text-[#aaa] transition-all">
                    <ArrowLeft className="inline w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 h-14 rounded-full font-bold text-lg text-[#0B0C10] bg-[#89F336] hover:bg-[#9EFF55] shadow-lg active:scale-[0.98] transition-all"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Finalizar <Check className="w-5 h-5 inline ml-2" /></>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center absolute bottom-8 left-0 w-full">
          <p className="text-gray-500 dark:text-[#666] text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="font-semibold hover:underline text-[#1a7c37] dark:text-[#89F336]">
              Fazer Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
