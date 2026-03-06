import { getToken } from "@/utils/auth"
import axios from "axios"
import baseURL from "./baseUrl"

const api = axios.create({
  baseURL: baseURL,
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api