import api from "@/api/api";
import { userInfo } from "@/data/user";
import { User } from "@/types/user";
import { TOKEN_KEY_USER } from "@/utils/auth";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getUserMeServiceServer = async (): Promise<User> => {
  const token = await getCookie(TOKEN_KEY_USER, { cookies })
  const response = await api.get('/users/me', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status !== 200) {
    return userInfo
  }
  return response.data.user
}