
import apiAdmin from "@/api/api-admin";
import { User } from "@/types/user";
import { saveAuthAdmin } from "@/utils/auth.admin";

interface AuthResponse {
  token: string;
  user: User;
}

export const SigninAdmin = async (
  credencial: string,
  password: string
): Promise<User | false> => {

  try {
    const { data } = await apiAdmin.post<AuthResponse>("/auth/signin", {
      credencial,
      password
    });

    if (data.user.role !== 'ADMIN') {
      return false
    }

    saveAuthAdmin(data.token, data.user.id);


    return data.user;
  } catch (error) {
    return false
  }

};

export const SignUpAdmin = async (
  nome: string,
  email: string,
  telefone: string,
  password: string
): Promise<User | false> => {


  try {
    const { data } = await apiAdmin.post<AuthResponse>("/auth/signup/client", {
      nome,
      email,
      telefone,
      password
    });

    return data.user;
  } catch (error) {
    return false
  }


};

export const CreateFuncionario = async (
  formData: FormData
): Promise<User | false> => {

  try {
    const { data } = await apiAdmin.postForm<AuthResponse>("/auth/signup/prof", formData);

    return data.user;
  } catch (error) {
    return false
  }
};

export const UpdateImageAdmin = async (
  formData: FormData
): Promise<User | false> => {

  try {
    const { data } = await apiAdmin.putForm(`/users/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    return data.user;
  } catch (error) {
    return false
  }
};