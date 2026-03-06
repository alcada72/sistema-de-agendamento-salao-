import api from "@/api/api";
import { Notification } from "@/types/notification";

export const getNotificattions = async (): Promise<Notification[] | false> => {
  try {
    const { data } = await api.get('/user/notify')

    return data.noticatios
  } catch (error) {
    console.log(error);
    return false
  }

}