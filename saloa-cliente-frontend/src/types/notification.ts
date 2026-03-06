import { User } from "./user"

export type Notification = {
  id: string,
  recevidId: string,
  senderId: string | null,
  serviceId: string | null,
  message: string,
  isRead: boolean,
  createdAt: Date,
  userId: null,
  sender: User | null
}