import { professional, service } from "./servicos";
import { User } from "./user";

export type agendamento = {
  id: string,
  date: Date,
  endDate: Date,
  status: "CONFIRMED" | "PENDING" | "CANCELLED",
  createdAt: Date,
  client: User,
  professional: professional,
  service: service
}

export type agendado = {
  agenda: agendamento
}