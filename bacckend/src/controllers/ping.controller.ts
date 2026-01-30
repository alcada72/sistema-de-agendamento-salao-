import type { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
  res.status(200).json({ pong: true })
}
export const pingPrivate = (req: Request, res: Response) => {
  res.status(200).json({ pong: true })
}