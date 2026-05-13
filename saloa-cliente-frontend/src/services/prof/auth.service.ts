
import apiProf from "@/api/api-prof";
import { User } from "@/types/user";
import { saveAuthProf } from "@/utils/auth.prof";

interface AuthResponse {
  token: string;
  user: User;
}

export const SigninProf = async (
  credencial: string,
  password: string
): Promise<User | false> => {

  try {
    const { data } = await apiProf.post<AuthResponse>("/auth/signin", {
      credencial,
      password
    });

    if (data.user.role !== 'PROFESSIONAL') {
      return false
    }

    saveAuthProf(data.token, data.user.id);

    return data.user;
  } catch (error) {
    return false
  }

};

export const UpdateImageProf = async (
  formData: FormData
): Promise<User | false> => {

  try {
    const { data } = await apiProf.putForm(`/users/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    return data.user;
  } catch (error) {
    return false
  }
};