import { Category } from "@prisma/client";
import type { Request, Response } from "express";
import { FindAllAgendamentoByProfessionals, FindAllProfessionals, FindAllProfessionalsWareCategory, FindProfessionalsById } from "../services/profissional.service";


export async function getAllProfessionals(req: Request, res: Response) {
  const profissionais = await FindAllProfessionals()

  res.status(200).json({ profissionais })
}

export async function getAllProfessionalsWhareCategory(req: Request, res: Response) {
  const category = req.params.category


  const profissionais = await FindAllProfessionalsWareCategory(category as Category)

  res.status(200).json(profissionais)
}

export async function GetAllAgendaByProfissional(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).json({ message: 'informe um id por favor' })
  }

  const user = await FindProfessionalsById(id as string)

  if (!user) {
    return res.status(401).json({ message: 'Profissional não econtrado' })
  }

  const agenda = await FindAllAgendamentoByProfessionals(id)
  if (!agenda) {
    return res.status(403).json({ message: 'usuario não tem agendamento' })
  }

  return res.status(200).json({ agenda })
}


