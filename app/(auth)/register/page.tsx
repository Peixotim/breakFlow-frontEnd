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
  const [invalidFields, setInvalidFields] = useState<{ cpf: boolean; cnpj: boolean }>({ cpf: false, cnpj: false });

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
    
    if (name === "cnpj") setInvalidFields(prev => ({...prev, cnpj: false}));
    if (name === "cpf") setInvalidFields(prev => ({...prev, cpf: false}));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length === 0) return; 

    if (name === "cnpj") {
      const isValid = validateCNPJ(value);
      if (!isValid && value.length > 0) { 
        toast.error("CNPJ inválido!");
        setInvalidFields(prev => ({ ...prev, cnpj: true }));
      }
    }
    if (name === "cpf") {
      const isValid = validateCPF(value);
      if (!isValid && value.length > 0) {
        toast.error("CPF inválido!");
        setInvalidFields(prev => ({ ...prev, cpf: true }));
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
      setInvalidFields(prev => ({...prev, cnpj: true})); 
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return nextStep();

    if (!formData.name || !formData.mail || !formData.cpf || !formData.password || !formData.confirmPassword) {
      toast.warning("Preencha todos os campos para finalizar!");
      return;
    }
    if (!validateCPF(formData.cpf)) {
      toast.error("CPF inválido! Corrija antes de enviar o cadastro.");
      setInvalidFields(prev => ({...prev, cpf: true})); 
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
      className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#121214] text-gray-900 dark:text-[#EDEDED] relative overflow-hidden"
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
          <div className="flex w-1/2 mx-auto mt-4">
             <div className={`h-1 rounded-l-full w-1/2 ${step === 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-500`} />
             <div className={`h-1 rounded-r-full w-1/2 ${step === 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-500`} />
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
                className="space-y-5 absolute w-full"
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
                    className="w-full h-14 mt-6 rounded-full font-bold text-lg text-white bg-[#1a7c37] hover:bg-[#14632b] dark:text-[#0B0C10] dark:bg-[#89F336] hover:scale-[1.02] transition-all"
                  >
                    Próximo <ArrowRight className="inline-block ml-2" />
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
                className="space-y-5 absolute w-full"
              >
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Nome" name="name" icon={<User />} placeholder="João Silva" value={formData.name} onChange={handleChange} required />
                  <InputGroup label="CPF" name="cpf" icon={<FileText />} placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} onBlur={handleBlur} isInvalid={invalidFields.cpf} maxLength={14} required />
                </div>
                <InputGroup label="Email de Acesso" name="mail" icon={<Mail />} placeholder="voce@empresa.com" value={formData.mail} onChange={handleChange} type="email" required />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Senha Forte" name="password" icon={<Lock />} placeholder="••••••••••••" value={formData.password} onChange={handleChange} type="password" required />
                  <InputGroup label="Confirmar Senha" name="confirmPassword" icon={<CheckCircle2 />} placeholder="••••••••••••" value={formData.confirmPassword} onChange={handleChange} type="password" required />
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={prevStep} className="w-1/3 h-14 rounded-full font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#222] dark:text-[#aaa] transition-all">
                    <ArrowLeft className="inline w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 h-14 rounded-full font-bold text-lg text-[#0B0C10] bg-[#89F336] hover:bg-[#9EFF55] shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Finalizar <Check className="w-5 h-5 inline ml-2" /></>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center">
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

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  isInvalid?: boolean;
}

const InputGroup = ({ icon, label, isInvalid = false, ...props }: InputGroupProps) => {
  const errorClasses = "border-red-500/50 focus:border-red-500 focus:ring-red-500/10";
  const focusClasses = "focus:border-primary/50 focus:ring-4 focus:ring-primary/10";
  
  return (
    <div className="space-y-2 group">
      <label className="label-form">{label}</label>
      <div className="input-container">
        <span className={`input-icon ${isInvalid ? "text-red-500" : ""}`}>
          {icon}
        </span>
        <input
          {...props}
          className={`input-field ${isInvalid ? errorClasses : focusClasses}`}
          required
        />
      </div>
    </div>
  );
};
