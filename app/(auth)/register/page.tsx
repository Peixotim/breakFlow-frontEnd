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
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { registerEnterprise } from "@/lib/api";
import { validateCPF, validateCNPJ } from "@/lib/validator";
import { Toaster, toast } from "sonner";

interface FormData {
  companyName: string;
  cnpj: string;
  name: string;
  mail: string;
  cpf: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(0.5);
  const [invalidFields, setInvalidFields] = useState<{ cpf: boolean; cnpj: boolean }>({
    cpf: false,
    cnpj: false,
  });

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    cnpj: "",
    name: "",
    mail: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBgOpacity((prev) => (prev >= 0.9 ? 0.4 : prev + 0.02));
    }, 120);
    return () => clearInterval(interval);
  }, []);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") formattedValue = formatCNPJ(value);
    if (name === "cpf") formattedValue = formatCPF(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (name === "cnpj") setInvalidFields((prev) => ({ ...prev, cnpj: false }));
    if (name === "cpf") setInvalidFields((prev) => ({ ...prev, cpf: false }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length === 0) return;

    if (name === "cnpj") {
      const isValid = validateCNPJ(value);
      if (!isValid && value.length > 0) {
        toast.error("CNPJ inválido!");
        setInvalidFields((prev) => ({ ...prev, cnpj: true }));
      }
    }
    if (name === "cpf") {
      const isValid = validateCPF(value);
      if (!isValid && value.length > 0) {
        toast.error("CPF inválido!");
        setInvalidFields((prev) => ({ ...prev, cpf: true }));
      }
    }
  };

  const nextStep = () => {
    if (!formData.companyName || !formData.cnpj) {
      toast.warning("Preencha todos os campos antes de continuar!");
      return;
    }
    if (!validateCNPJ(formData.cnpj)) {
      toast.error("CNPJ inválido! Corrija antes de prosseguir.");
      setInvalidFields((prev) => ({ ...prev, cnpj: true }));
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return nextStep();

    if (
      !formData.name ||
      !formData.mail ||
      !formData.cpf ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.warning("Preencha todos os campos para finalizar!");
      return;
    }
    if (!validateCPF(formData.cpf)) {
      toast.error("CPF inválido! Corrija antes de enviar o cadastro.");
      setInvalidFields((prev) => ({ ...prev, cpf: true }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
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
      toast.success("Conta criada com sucesso! Redirecionando...");
      await new Promise((res) => setTimeout(res, 1800));
      router.push("/dashboard?status=registered");
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        toast.error(err.message || "Erro ao registrar. Tente novamente.");
      } else {
        toast.error("Erro desconhecido ao registrar. Tente novamente.");
      }
    }
  };

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

  return (
    <motion.div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50 p-8 text-gray-900 dark:bg-[#121214] dark:text-[#EDEDED]"
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Toaster position="bottom-center" richColors theme="dark" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: bgOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute inset-0"
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
        className="relative z-10 w-full max-w-xl rounded-3xl border border-gray-200 bg-white/70 p-10 shadow-2xl backdrop-blur-2xl sm:p-12 dark:border-white/5 dark:bg-[#18181B]/80"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 text-center">
          <h1 className="animate-text-shimmer mb-3 bg-linear-to-r from-gray-900 via-[#1a7c37] to-gray-900 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-[#89F336] dark:to-white">
            Crie sua Conta BreakFlow
          </h1>
          <p className="text-lg text-gray-500 dark:text-[#888]">
            Etapa {step} de 2: {step === 1 ? "Dados da Empresa" : "Sua Conta Pessoal"}
          </p>
          <div className="mx-auto mt-4 flex w-1/2">
            <div
              className={`h-1 w-1/2 rounded-l-full ${step === 1 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"} transition-all duration-500`}
            />
            <div
              className={`h-1 w-1/2 rounded-r-full ${step === 2 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"} transition-all duration-500`}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative h-[360px] overflow-visible">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full space-y-5"
              >
                <motion.div variants={fadeItem} custom={0}>
                  <InputGroup
                    label="Nome da Empresa"
                    icon={<Building />}
                    name="companyName"
                    placeholder="Ex: TechFlow LTDA"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div variants={fadeItem} custom={1}>
                  <InputGroup
                    label="CNPJ"
                    icon={<FileText />}
                    name="cnpj"
                    placeholder="00.000.000/0001-00"
                    value={formData.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={invalidFields.cnpj}
                    maxLength={18}
                    required
                  />
                </motion.div>
                <motion.div variants={fadeItem} custom={2}>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="mt-6 h-14 w-full rounded-full bg-[#1a7c37] text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#14632b] dark:bg-[#89F336] dark:text-[#0B0C10]"
                  >
                    Próximo <ArrowRight className="ml-2 inline-block" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Nome"
                    name="name"
                    icon={<User />}
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup
                    label="CPF"
                    name="cpf"
                    icon={<FileText />}
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={invalidFields.cpf}
                    maxLength={14}
                    required
                  />
                </div>
                <InputGroup
                  label="Email de Acesso"
                  name="mail"
                  icon={<Mail />}
                  placeholder="voce@empresa.com"
                  value={formData.mail}
                  onChange={handleChange}
                  type="email"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Senha Forte"
                    name="password"
                    icon={<Lock />}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                  />
                  <InputGroup
                    label="Confirmar Senha"
                    name="confirmPassword"
                    icon={<CheckCircle2 />}
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="h-14 w-1/3 rounded-full bg-gray-200 font-bold text-gray-700 transition-all hover:bg-gray-300 dark:bg-[#222] dark:text-[#aaa]"
                  >
                    <ArrowLeft className="inline h-5 w-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 w-2/3 rounded-full bg-[#89F336] text-lg font-bold text-[#0B0C10] shadow-lg transition-all hover:bg-[#9EFF55] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        Finalizar <Check className="ml-2 inline h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-[#666]">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1a7c37] hover:underline dark:text-[#89F336]"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  isInvalid?: boolean;
}

const InputGroup = ({ icon, label, isInvalid = false, ...props }: InputGroupProps) => {
  const errorClasses = "border-red-500/50 focus:border-red-500 focus:ring-red-500/10";
  const focusClasses = "focus:border-primary/50 focus:ring-4 focus:ring-primary/10";

  return (
    <div className="group space-y-2">
      <label className="label-form">{label}</label>
      <div className="input-container">
        <span className={`input-icon ${isInvalid ? "text-red-500" : ""}`}>{icon}</span>
        <input
          {...props}
          className={`input-field ${isInvalid ? errorClasses : focusClasses}`}
          required
        />
      </div>
    </div>
  );
};
