export function validateCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calcCheckDigit = (base: number[]): number => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += base[i] * (base.length + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  
  const d = digits.split('').map(Number);
  const firstCheck = calcCheckDigit(d.slice(0, 9));
  const secondCheck = calcCheckDigit(d.slice(0, 10));
  
  return firstCheck === d[9] && secondCheck === d[10];
}

export function validateCNPJ(cnpj: string): boolean {
  if (typeof cnpj !== 'string') return false;
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const calcCheckDigit = (base: number[], multipliers: number[]): number => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += base[i] * multipliers[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const d = digits.split('').map(Number);
  const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstCheck = calcCheckDigit(d.slice(0, 12), multipliers1);
  const secondCheck = calcCheckDigit(d.slice(0, 13), multipliers2);

  return firstCheck === d[12] && secondCheck === d[13];
}