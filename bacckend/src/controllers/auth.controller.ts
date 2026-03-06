import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt-ts";
import type { Request, Response } from "express";
import { SigninSchemas } from "../schemas/signinSchemas";
import { SignupAdminSchema } from "../schemas/signupSchemas";
import { SignupUserAmin } from "../services/auth_admin.service";
import { RegisterActividade } from "../services/notification.service";
import { VerifyEmailSend } from "../services/sendVerification.service";
import { findUserByTelefone, FindUserEmail } from "../services/user.service";
import { generateVerificationCode } from "../utils/geradorOTP";
import { createJWT } from "../utils/jwt";
import { prisma } from "../utils/prisma";
import { getPublicFormattedUrl } from "../utils/url";

export const signupUserAdmin = async (req: Request, res: Response) => {
  const safedata = SignupAdminSchema.safeParse(req.body)

  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }

  const verifyUser = await FindUserEmail(safedata.data.email)
  if (verifyUser) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  const haspass = await hash(safedata.data.password as string, 10)

  const newAdmin = await SignupUserAmin({
    nome: safedata.data.nome,
    email: safedata.data.email,
    password: haspass,
    telefone: safedata.data.telefone || null,
    role: Role.ADMIN
  })
  if (!newAdmin) {
    return res.status(403).json({ error: 'Acesso negado' })
  }
  const token = await createJWT(newAdmin.id, newAdmin.role)
  return res.status(201).json({
    message: 'Usuario cadastrdo com sucesso',
    user: {
      id: newAdmin.id,
      name: newAdmin.nome,
      email: newAdmin.email,
    },
    token
  })

}

export const signupUserProfisional = async (req: Request, res: Response) => {
  const safedata = SignupAdminSchema.safeParse(req.body)
  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }
  const image = req.file
  if (!image) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const resumeImage = getPublicFormattedUrl(image.path as string)
  const verifyUser = await FindUserEmail(safedata.data.email)
  if (verifyUser) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  const haspass = await hash(safedata.data.password as string, 10)

  const newAdmin = await SignupUserAmin({
    nome: safedata.data.nome,
    email: safedata.data.email,
    password: haspass,
    telefone: safedata.data.telefone || null,
    image: resumeImage,
    role: Role.PROFESSIONAL
  })

  if (!newAdmin) {
    return res.status(403).json({ error: 'Acesso negado' })
  }
  await RegisterActividade(`Profissional ${newAdmin.nome} acbou de se registar`, newAdmin.id)

  const token = await createJWT(newAdmin.id, newAdmin.role)

  return res.status(201).json({
    message: 'Usuario cadastrdo com sucesso',
    user: {
      id: newAdmin.id,
      name: newAdmin.nome,
      email: newAdmin.email,
      image: newAdmin.image
    },
    token
  })
}

export const signupUserClient = async (req: Request, res: Response) => {
  const safedata = SignupAdminSchema.safeParse(req.body)
  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }
  const verifyUser = await FindUserEmail(safedata.data.email)
  const code = generateVerificationCode();
  if (verifyUser) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  const haspass = await hash(safedata.data.password as string, 10)
  const newClient = await SignupUserAmin({
    nome: safedata.data.nome,
    email: safedata.data.email,
    password: haspass,
    telefone: safedata.data.telefone || null,
    role: Role.CLIENT,
    emaiverificationid: code as string,
    expiracaoEmail: new Date(Date.now() + 10 * 60 * 1000),
  })


  if (!newClient) {
    return res.status(403).json({ error: 'Acesso negado' })
  }


  try {
    if (newClient.email) await VerifyEmailSend(newClient.email);
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);

    await prisma.user.delete({ where: { id: newClient.id } });

    return res.status(403).json({
      error: "Erro ao enviar e-mail de verificação. Cadastro cancelado.",
    });
  }

  const token = await createJWT(newClient.id, newClient.role)

  await RegisterActividade(`Cliente ${newClient.nome} acbou de se registar`, newClient.id)

  return res.status(201).json({
    message: 'Usuario cadastrdo com sucesso',
    user: {
      id: newClient.id,
      name: newClient.nome,
      email: newClient.email,
    },
    token
  })
}

export const SigninUser = async (req: Request, res: Response) => {

  const safedata = await SigninSchemas.safeParse(req.body)

  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }

  const verifyEmail = await FindUserEmail(safedata.data.credencial)
  const verifyTelefone = await findUserByTelefone(safedata.data.credencial)

  if (!verifyEmail && !verifyTelefone) {
    return res.status(400).json({ error: "E-mail ou senha incorreta!--" });
  }

  const userCredencial = verifyTelefone || verifyEmail;

  if (!userCredencial) {
    return res.status(400).json({ error: "E-mail ou senha incorreta!" });
  }

  const hasPassword = await compare(safedata.data.password, userCredencial.password)
  if (!hasPassword) {
    return res.status(403).json({ error: "E-mail ou senha incorreta...!" });
  }

  const token = await createJWT(userCredencial.id, userCredencial.role)
  return res.status(200).json({
    message: 'Usuario logado com sucesso',
    user: {
      id: userCredencial.id,
      name: userCredencial.nome,
      email: userCredencial.email,
      role: userCredencial.role
    },
    token
  })
}