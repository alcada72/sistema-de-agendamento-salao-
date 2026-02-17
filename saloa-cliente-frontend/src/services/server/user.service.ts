import api from "@/api/api";
import { User } from "@/types/user";
import { TOKEN_KEY_USER } from "@/utils/auth";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getUserMeServiceServer = async (): Promise<User | false> => {

  try {
    const token = await getCookie(TOKEN_KEY_USER, { cookies })
    const response = await api.get('/users/me', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      return false
    }
    return response.data.user
    
  } catch (error) {
    return false
  }

}

export const pingUser = async () => {
  try {
    const token = await getCookie(TOKEN_KEY_USER, { cookies })
    await api.get('/pingPrivate', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return true
  } catch (error) {
    return false
  }
}
