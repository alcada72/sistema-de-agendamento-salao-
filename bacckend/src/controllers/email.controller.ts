import { Request, Response } from "express";
import { ConfirmEmailSchema } from "../schemas/emailVericatinSchemas";
import { VerifyEmailSend } from "../services/sendVerification.service";
import { extendedRequest } from "../types/extended-types";
import { generateVerificationCode } from "../utils/geradorOTP";
import { prisma } from "../utils/prisma";


export const verifacationEmail = async (req: Request, res: Response) => {
  const safeData = ConfirmEmailSchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({
      error: safeData.error.flatten().fieldErrors,
    });
  }

  const { token } = safeData.data;

  const user = await prisma.user.findUnique({
    where: { emaiverificationid: token },
  });

  if (!user) {
    return res
      .status(403)
      .json({ error: "Código de verificação inválido ou expirado." });
  }

  if (user.expiracaoEmail && user.expiracaoEmail < new Date()) {
    return res.status(400).json({ error: "Código expirado!" });
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailverificadIn: new Date(),
      emaiverificationid: null,
      expiracaoEmail: null,
      isVerified: true,
    },
  });

  if (!updatedUser) {
    return res.status(500).json({ error: "Erro ao confirmar e-mail" });
  }

  return res.status(200).json({ message: "E-mail confirmado com sucesso!" });
};

export const reeSendEmail = async (req: extendedRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId as string },
  });

  if (!user) return res.status(403).json({ error: "Acesso negado" });

  if (user.expiracaoEmail && user.expiracaoEmail > new Date()) {
    return res.status(400).json({
      error: "Aguarde antes de solicitar novo código.",
    });
  }

  const code = generateVerificationCode();
  const update = await prisma.user.update({
    where: { id: user.id },
    data: {
      emaiverificationid: code as string,
      expiracaoEmail: new Date(Date.now() + 10 * 60 * 1000),
      isVerified: false,
    },
  });

  if (!update) return res.json({ error: "erro ao enviar código" });

  const sendCode = await VerifyEmailSend(update.email as string);
  if (!sendCode) return res.json({ error: "erro ao enviar código" });
  return res
    .status(200)
    .json({ message: "Código reenviado com sucesso! para: " + update.email });
};
