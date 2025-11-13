interface ApiRegisterPayload {
  enterprise: {
    companyName: string;
    cnpj: string;
    numberOfEmployees: number;
    numberOfSectors: number;
    contactMail: string;
  };
  owner: {
    name: string;
    mail: string;
    cpf: string;
    password: string;
    role: "OWNER";
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';


export async function registerEnterprise(
  payload: ApiRegisterPayload
){
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao registrar.');
    }

    return await response.json();

  } catch (error) {
    console.error('Erro no apiService.registerEnterprise:', error);
    throw error;
  }
}