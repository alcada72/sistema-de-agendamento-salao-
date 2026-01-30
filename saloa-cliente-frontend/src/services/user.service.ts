import api from "@/api/api";
import { userInfo } from "@/data/user";
import { User } from "@/types/user";

export const getUserMeService = async (): Promise<User> => {
  const response = await api.get('/users/me', {})

  if (response.status !== 200) {
    return userInfo
  }
  return response.data.user

}