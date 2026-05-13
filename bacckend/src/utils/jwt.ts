import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { FindUserById } from "../services/user.service";
import { extendedRequest } from "../types/extended-types";



export const createJWT = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  const reqExtended = req as extendedRequest;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };

    const user = await FindUserById(decoded.id);
    if (!user) {
      return res.status(403).json({ error: "Acesso Negado" });
    }
    reqExtended.userId = user.id;
    reqExtended.role = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
     const reqExtended = req as extendedRequest;

    if (!reqExtended.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (!reqExtended.role) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (!roles.includes(reqExtended.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
};
