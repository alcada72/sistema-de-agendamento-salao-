import { images } from "./user"

export type service = {
  id: string,
  nome: string,
  description: string,
  duration: number,
  price: number,
  professionalId: number,
  createdAt: Date,
  images: images[],
  professional: professional
}
export type agenda = {
  id: string,
  date: Date,
  endDate: Date,
  status: "CONFIRMED" | "PENDING" | "CANCELLED",
  createdAt: Date,
  service:service
}

export type professional = {
  id: string,
  nome: string,
  email: string,
  telefone: string
}


