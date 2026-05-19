import api from "@/api/api";
import { User } from "@/types/user";
import { saveAuth } from "@/utils/auth";
import { saveAuthAdmin } from "@/utils/auth.admin";
import { saveAuthProf } from "@/utils/auth.prof";

interface AuthResponse {
  token: string;
  user: User;
}

export const SigninService = async (
  credencial: string,
  password: string
): Promise<User | false> => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/signin", {
      credencial,
      password
    });



    if (data.user.role === 'ADMIN') {
      saveAuthAdmin(data.token, data.user.id);
    } else if (data.user.role === 'PROFESSIONAL') {
      saveAuthProf(data.token, data.user.id);
    } else {
      saveAuth(data.token, data.user.id);
    }

    return data.user;
  } catch (error) {
    return false
  }

};

export const SignUpService = async (
  nome: string,
  email: string,
  telefone: string,
  password: string
): Promise<User | false> => {

  try {
    const res = await api.post("/auth/signup/client", {
      nome,
      email,
      telefone,
      password
    });

    saveAuth(res.data.token, res.data.user.id);
    console.log(res);

    return res.data.user;
  } catch (error) {
    console.log(error);

    return false
  }


};

export const UpdateImage = async (
  formData: FormData
): Promise<true | false> => {

  try {
    const response = await api.put(`/users/avatar`, formData)

    if (response.status !== 201) {
      return false
    }

    return true;
  } catch (error) {
    return false
  }
};