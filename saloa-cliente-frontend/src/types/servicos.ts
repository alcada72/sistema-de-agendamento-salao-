import { images, User } from "./user"

export type service = {
  id: string,
  nome: string,
  description: string,
  duration: number,
  price: number,
  professionalId: number,
  createdAt: Date,
  images: images[],
  professional: User
}
export type agenda = {
  id: string,
  date: Date,
  endDate: Date,
  status: "CONFIRMED" | "PENDING" | "CANCELLED",
  createdAt: Date,
  service: service,
  client: User
}



