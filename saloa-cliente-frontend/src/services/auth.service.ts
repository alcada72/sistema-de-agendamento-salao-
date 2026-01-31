import api from "@/api/api";
import { User } from "@/types/user";
import { saveAuth } from "@/utils/auth";

interface AuthResponse {
  token: string;
  user: User;
}

export const SigninService = async (
  credencial: string,
  password: string
): Promise<User> => {

  const { data } = await api.post<AuthResponse>("/auth/signin", {
    credencial,
    password
  });


  saveAuth(data.token, data.user.id);


  return data.user;
};

export const SignUpService = async (
  nome: string,
  email: string,
  telefone: string,
  password: string
): Promise<User> => {

  const { data } = await api.post<AuthResponse>("/auth/signup/client", {
    nome,
    email,
    telefone,
    password
  });

  saveAuth(data.token, data.user.id);

  return data.user;
};
