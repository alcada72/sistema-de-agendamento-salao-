import api from "@/api/api"
import { bookMrak } from "@/types/servicos"

export const toggleBookmark = async (id: string): Promise<boolean | undefined> => {
  try {
    const res = await api.post(`/services/${id}/bookmark`)
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const getBookmarks = async (): Promise<bookMrak[] | false> => {
  try {
    const res = await api.get(`/user/bookmarks`)
    return res.data.markeds
  } catch (error) {
    console.log(error)
    return false
  }
}

export const checkBookmark = async (id: string): Promise<boolean> => {
  try {
    const res = await api.get<boolean>(`/services/${id}/bookmark/check`)
    if (res.status === 200) {
      return res.data
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}