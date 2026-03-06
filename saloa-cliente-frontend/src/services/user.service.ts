import api from "@/api/api";
import { userInfo } from "@/data/user";
import { UpdateUser } from "@/types/update";
import { User } from "@/types/user";

export const getUserMeService = async (): Promise<User> => {
  const response = await api.get('/users/me', {})

  if (response.status !== 200) {
    return userInfo
  }
  return response.data.user

}

export const getUserByIdService = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`, {})

  if (response.status !== 200) {
    return userInfo
  }

  return response.data.user
}

export const UpdateUserByIdService = async (data: Partial<UpdateUser>): Promise<User | false> => {
  try {
    const response = await api.put(`/users/me`, data)
    if (response.status !== 200) {
      return false
    }

    return response.data.user
  } catch (error) {
    console.log(error);
    return false
  }
}

export const UpadateUserPassword = async (password: string, confirmPassword: string): Promise<true | false> => {
  try {
    const response = await api.put(`/users/password`, {
      password,
      confirmPassword
    })
    if (response.status !== 200) {
      return false
    }
    return true
  } catch (error) {
    console.log(error);
    return false
  }

}