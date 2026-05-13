import type { Request, Response } from "express";
import { FindAllAgendamentoByProfissional, FindAllProfissionais, FindProfissionalById } from "../services/profissional.service";
import { extendedRequest } from "../types/extended-types";


export async function getAllProfessionals(req: Request, res: Response) {
  const profissionais = await FindAllProfissionais()

  res.status(200).json({ profissionais })
}

export async function GetAllAgendaByProfissional(req: extendedRequest, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).json({ message: 'informe um id por favor' })
  }

  const user = await FindProfissionalById(id as string)

  if (!user) {
    return res.status(401).json({ message: 'Profissional não econtrado' })
  }

  const agenda = await FindAllAgendamentoByProfissional(id)
  if (!agenda) {
    return res.status(403).json({ message: 'usuario não tem agendamento' })
  }

  return res.status(200).json({ agenda })
}


