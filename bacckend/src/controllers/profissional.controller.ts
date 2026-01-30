import type { Request, Response } from "express";
import { FindAllProfissionais } from "../services/profissional.service";


export async function getAllProfessionals(req: Request, res: Response) {
  const profissionais = await FindAllProfissionais()

  res.status(200).json({ profissionais })
}