import apiAdmin from "@/api/api-admin";
import { userInfo } from "@/data/user";
import { User } from "@/types/user";

export const getUserMeServiceAdmin = async (): Promise<User> => {
  const response = await apiAdmin.get('/users/me', {})

  if (response.status !== 200) {
    return userInfo
  }
  
  return response.data.user

}

export const getUserByIdServiceAdmin = async (id: string): Promise<User> => {
  const response = await apiAdmin.get(`/users/${id}`, {})

  if (response.status !== 200) {
    return userInfo
  }

  return response.data.user
}
export const DeleteUserByIdServiceAdmin = async (id: string): Promise<boolean | undefined> => {
  try {
    const res = await apiAdmin.delete(`/users/${id}`)
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

