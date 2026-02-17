import apiAdmin from "@/api/api-admin";
import { userInfo } from "@/data/user";
import { User } from "@/types/user";
import { TOKEN_KEY_ADMIN } from "@/utils/auth.admin";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getUserMeServiceServerAdmin = async (): Promise<User> => {
  const token = await getCookie(TOKEN_KEY_ADMIN, { cookies })
  const response = await apiAdmin.get('/users/me', {
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


export const pingAdmin = async () => {
  try {
    const token = await getCookie(TOKEN_KEY_ADMIN, { cookies })
    await apiAdmin.get('/pingPrivate', {
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
