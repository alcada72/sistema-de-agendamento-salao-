import apiProf from "@/api/api-prof";
import { userInfo } from "@/data/user";
import { User } from "@/types/user";
import { TOKEN_KEY_PROF } from "@/utils/auth.prof";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getUserMeServiceServerProf = async (): Promise<User> => {
  const token = await getCookie(TOKEN_KEY_PROF, { cookies })
  const response = await apiProf.get('/users/me', {
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


export const pingProf = async () => {
  try {
    const token = await getCookie(TOKEN_KEY_PROF, { cookies })
    await apiProf.get('/pingPrivate', {
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
