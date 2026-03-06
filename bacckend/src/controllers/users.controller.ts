import { hash } from "bcrypt-ts";
import { Response } from "express";
import { updatePasswordSchema, upDateUserSchema } from "../schemas/update-user";
import { getAllMarks } from "../services/bookMark.service";
import { getUserNotifications, RegisterActividade, sendNotifications } from "../services/notification.service";
import { DeleteUserById, FindAllUsers, FindUserById, updateAvatarUser, updatePasswordUser, UpdateUserById, UserCreateImagem } from "../services/user.service";
import { extendedRequest } from "../types/extended-types";
import { getPublicFormattedUrl } from "../utils/url";

export async function getMe(req: extendedRequest, res: Response) {
  const id = req.userId
  if (!id) {
    console.log("usuario não encontrado")
    return res.status(401).json({ error: "Não autenticado" });
  }
  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.status(200).json({ user });
}

export async function updateMe(req: extendedRequest, res: Response) {
  const id = req.userId;
  const safedata = upDateUserSchema.safeParse(req.body)
  console.log(safedata)
  console.log(req.body);
  
  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }

  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const updatedUser = await UpdateUserById(id as string, safedata.data);
  if (!updatedUser) {
    return res.status(403).json({ error: "Erro ao atualizar usuário" });
  }
  await RegisterActividade(`o usuario ${user.nome} atualizou seu perfil`, user.id)
  return res.status(200).json({ user: updatedUser });
}

export async function updateMyPassword(req: extendedRequest, res: Response) {
  const id = req.userId;
  const safedata = updatePasswordSchema.safeParse(req.body)

  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }

  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const haspass = await hash(safedata.data.password as string, 10)
  const updatedUser = await updatePasswordUser(id as string, { password: haspass });
  if (!updatedUser) {
    return res.status(403).json({ error: "Erro ao atualizar usuário" });
  }

  await RegisterActividade(`o usuario ${user.nome} atualizou sua senha`, user.id)
  await sendNotifications(`Olá ${user.nome} a sua senha foi atualizada com sucesso!`, user.id)
  return res.status(200).json({ user: updatedUser });
}

export async function deleteMe(req: extendedRequest, res: Response) {
  // Implementation here
  const id = req.userId;
  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const deletedUser = await DeleteUserById(id as string);
  if (!deletedUser) {
    return res.status(403).json({ error: "Erro ao deletar usuário" });
  }
  await RegisterActividade(`o usuario ${user.nome} deletou sua conta`, user.id)
  return res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
}

export async function getUserById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const user = await FindUserById(id as string);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.status(200).json({ user });
}

export async function getAllUsers(req: extendedRequest, res: Response) {
  const id = req.userId;
  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  const users = await FindAllUsers();
  return res.status(200).json({ users });
}

export async function deleteUserById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const deletedUser = await DeleteUserById(id as string);
  if (!deletedUser) {
    return res.status(403).json({ error: "Erro ao deletar usuário" });
  }
  await RegisterActividade(`o usuario ${user.nome} teve sua conta deletada`, user.id)
  return res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
}

export async function updateUserById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const safedata = upDateUserSchema.safeParse(req.body)
  if (!safedata.success) {
    return res.status(401).json({
      error: safedata.error.flatten().fieldErrors
    })
  }
  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const updatedUser = await UpdateUserById(id as string, safedata.data);
  if (!updatedUser) {
    return res.status(403).json({ error: "Erro ao atualizar usuário" });
  }
  await RegisterActividade(`o usuario ${user.nome} teve seu perfil atualizado`, user.id)
  return res.status(200).json({ user: updatedUser });
}

export async function postImagem(req: extendedRequest, res: Response) {
  const id = req.userId as string;

  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário inexistente" });
  }

  const publicUrl = getPublicFormattedUrl(req.file.path);


  const imagem = await UserCreateImagem(publicUrl, id)
  if (!imagem) {
    res.status(403).json({ message: "Erro ao postar" })
  }
  res.status(201).json({ message: "Imagem Postada com sucesso", imagem })

}

export async function upDateAvater(req: extendedRequest, res: Response) {
  const id = req.userId as string;

  if (!req.file) {
    return res.status(403).json({ error: "Nenhum arquivo enviado" });
  }

  const user = await FindUserById(id);

  if (!user) {
    return res.status(403).json({ error: "Usuário inexistente" });
  }

  const publicUrl = getPublicFormattedUrl(req.file.path);

  const avatar = await updateAvatarUser(id, { image: publicUrl })

  if (!avatar) {
    return res.status(403).json({ error: "Erro ao atualizar avatar" });
  }
  await RegisterActividade(`o usuario ${user.nome} atualizou seu avatar`, user.id)
  res.status(201).json({ message: "Imagem de perfil atualizada com sucesso com sucesso", })
}

export async function getNotifcationsByUser(req: extendedRequest, res: Response) {
  const id = req.userId;
  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }


  const noticatios = await getUserNotifications(id as string)

  res.json({ noticatios })
}

export const getMarksByUser = async (req: extendedRequest, res: Response) => {
  const userId = req.userId as string
  if (!userId) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  const markeds = await getAllMarks(userId)

  return res.status(200).json({ markeds });
}