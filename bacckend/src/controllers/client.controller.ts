import { Request, Response } from "express";
import { GetAgendamentoByUser } from "../services/agendamento.service";
import { findAllClient, findClientById } from "../services/clientes.service";

export async function getAllClients(req: Request, res: Response) {
  const clients = await findAllClient()
  return res.status(200).json({ clients })
}
export async function getClientById(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).json({ message: 'informe um id por favor' })
  }
  const user = await findClientById(id as string)
  if (!user) {
    return res.status(401).json({ message: 'usuario não econtrado' })
  }
  return res.status(200).json({ user })

}

export async function getAppointmentsByUserId(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).json({ message: 'informe um id por favor' })
  }
  
  const user = await findClientById(id as string)

  if (!user) {
    return res.status(401).json({ message: 'usuario não econtrado' })
  }

  const agenda = await GetAgendamentoByUser(id)
  if (!agenda) {
    return res.status(403).json({ message: 'usuario não tem agendamento' })
  }
  return res.status(200).json({ agenda })
}