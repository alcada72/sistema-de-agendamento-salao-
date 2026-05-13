import apiAdmin from "@/api/api-admin";
import { Notification } from "@/types/notification";

export const getNotificattionsAdmin = async (): Promise<Notification[] | false> => {
  try {
    const { data } = await apiAdmin.get('/user/notify')

    return data.noticatios
  } catch (error) {
    console.log(error);
    return false
  }

}