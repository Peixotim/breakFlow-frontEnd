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
  XCircle,
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

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(0.5);

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
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
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
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cnpj") newValue = formatCNPJ(value);
    if (name === "cpf") newValue = formatCPF(value);

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf" && value) {
      if (!validarCPF(value)) showToast("CPF inválido! Verifique o número digitado antes de continuar.");
    }

    if (name === "cnpj" && value) {
      if (!validarCNPJ(value)) showToast("CNPJ inválido! Por favor, confira os dígitos e tente novamente.");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.companyName || !formData.cnpj) {
        showToast("Preencha todos os campos antes de continuar!");
        return;
      }
      if (!validarCNPJ(formData.cnpj)) {
        showToast("O CNPJ informado é inválido. Corrija antes de prosseguir.");
        return;
      }
      setStep(2);
    }
  };

  const prevStep = () => setStep(1);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 2) return;

    if (!formData.name || !formData.mail || !formData.cpf || !formData.password) {
      showToast("Preencha todos os campos para finalizar!");
      return;
    }

    if (!validarCPF(formData.cpf)) {
      showToast("CPF inválido! Corrija antes de enviar o cadastro.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const apiRequest = {
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
      await registerEnterprise(apiRequest);
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/dashboard?status=registered");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao registrar. Tente novamente.");
      setIsLoading(false);
    }
  };

  // ---------- ANIMAÇÕES ----------
  const fadeItem: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
    }),
  };

  const variants: Variants = {
    hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -80, filter: "blur(6px)", transition: { duration: 0.4 } },
  };

  // ---------- JSX ----------
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-8
                 bg-gray-50 dark:bg-[#121214]
                 text-gray-900 dark:text-[#EDEDED]
                 selection:bg-[#89F336]/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 100, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 z-50 bg-[#1a7c37] text-white dark:bg-[#89F336] dark:text-[#0B0C10]
                       px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium"
          >
            <Info className="w-5 h-5" /> {toast}
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
          transition={{ duration: 1.2, ease: "easeInOut" }}
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

      {/* Container principal */}
      <motion.div
        key={`container-${step}`}
        className="relative z-10 w-full max-w-xl p-10 sm:p-12
                   bg-white/70 dark:bg-[#18181B]/80 backdrop-blur-2xl
                   border border-gray-200 dark:border-white/5
                   shadow-2xl dark:shadow-black/40 rounded-3xl"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text 
                       bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900
                       dark:from-white dark:via-[#89F336] dark:to-white
                       animate-text-shimmer mb-3"
          >
            Crie sua Conta BreakFlow
          </h1>
          <p className="text-gray-500 dark:text-[#888888] text-lg">
            Etapa {step} de 2: {step === 1 ? "Dados da Empresa" : "Sua Conta Pessoal"}
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="relative min-h-[440px] overflow-visible">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              // ---------- ETAPA 1 ----------
              <motion.div
                key="step1-fields"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5 w-full"
              >
                {[{ label: "Nome da Empresa", name: "companyName" as keyof FormData, icon: Building },
                  { label: "CNPJ", name: "cnpj" as keyof FormData, icon: FileText }].map((field, i) => (
                  <motion.div
                    key={`step1-${field.name}`}
                    variants={fadeItem}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="space-y-2 group"
                  >
                    <label className="label-form">{field.label}</label>
                    <div className="input-container">
                      <field.icon className="input-icon" />
                      <input
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field focus:ring-2 focus:ring-[#89F336]/50 focus:outline-none"
                        required
                      />
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  key="next-btn"
                  variants={fadeItem}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  type="button"
                  onClick={nextStep}
                  className="w-full h-14 mt-6 rounded-full font-bold text-[17px] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] text-white bg-[#1a7c37] hover:bg-[#14632b] shadow-lg shadow-[#1a7c37]/30 dark:text-[#0B0C10] dark:bg-[#89F336] dark:hover:bg-[#9EFF55] dark:shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)]"
                >
                  Próximo <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              // ---------- ETAPA 2 ----------
              <motion.div
                key="step2-fields"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5 w-full"
              >
                <motion.div
                  variants={fadeItem}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="grid grid-cols-2 gap-4"
                >
                  {[{ label: "Nome", name: "name" as keyof FormData, icon: User },
                    { label: "CPF", name: "cpf" as keyof FormData, icon: FileText }].map((f) => (
                    <div key={`step2-${f.name}`} className="space-y-2 group">
                      <label className="label-form">{f.label}</label>
                      <div className="input-container">
                        <f.icon className="input-icon" />
                        <input
                          name={f.name}
                          placeholder={f.label}
                          value={formData[f.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-field focus:ring-2 focus:ring-[#89F336]/50 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                {[{ label: "Email de Acesso", name: "mail", icon: Mail },
                  { label: "Senha Forte", name: "password", icon: Lock }].map((f, i) => (
                  <motion.div
                    key={`step2-${f.name}`}
                    variants={fadeItem}
                    initial="hidden"
                    animate="visible"
                    custom={i + 1}
                    className="space-y-2 group"
                  >
                    <label className="label-form">{f.label}</label>
                    <div className="input-container">
                      <f.icon className="input-icon" />
                      <input
                        name={f.name}
                        type={f.name === "password" ? "password" : "text"}
                        placeholder={f.label}
                        value={formData[f.name as keyof FormData]}
                        onChange={handleChange}
                        className="input-field focus:ring-2 focus:ring-[#89F336]/50 focus:outline-none"
                        required
                      />
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  key="step2-buttons"
                  variants={fadeItem}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="flex gap-4 pt-2"
                >
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 h-14 rounded-full font-bold text-base bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#222] dark:text-[#888] dark:hover:bg-[#2a2a2a] active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 inline-block" />
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 h-14 rounded-full font-bold text-lg text-[#0B0C10] bg-[#89F336] hover:bg-[#9EFF55] shadow-[0_0_20px_-5px_rgba(137,243,54,0.4)] hover:shadow-[0_0_25px_-5px_rgba(137,243,54,0.6)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Finalizar <Check className="w-5 h-5" /></>}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center absolute bottom-8 left-0 w-full">
          <p className="text-gray-500 dark:text-[#666] font-medium text-sm">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-bold hover:underline text-[#1a7c37] hover:text-green-700 dark:text-[#89F336] dark:hover:text-[#B4FF75]"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
