import { hash } from "bcrypt-ts";
import { Request, Response } from "express";
import { updatePasswordSchema, upDateUserSchema } from "../schemas/update-user";
import { getAllMarks } from "../services/bookMark.service";
import { getUserNotifications, RegisterActividade, sendNotifications } from "../services/notification.service";
import { DeleteUserById, FindAllUsers, FindUserById, updateAvatarUser, updatePasswordUser, UpdateUserById, UserCreateImagem } from "../services/user.service";
import { extendedRequest } from "../types/extended-types";
import { deleteImageFromCloudinary } from "../utils/cloudinary";

export async function getMe(req: Request, res: Response) {
  const reqExtended = req as extendedRequest
  const id = reqExtended.userId
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

export async function updateMe(req: Request, res: Response) {
  try {

    const reqExtended = req as extendedRequest;
    const id = reqExtended.userId;

    if (!id) {
      return res.status(401).json({
        error: "Não autenticado"
      });
    }

    const safedata = upDateUserSchema.safeParse(req.body);

    if (!safedata.success) {
      return res.status(400).json({
        error: safedata.error.flatten().fieldErrors
      });
    }

    const user = await FindUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    let publicUrl = user.image;

    const image = reqExtended.file as Express.Multer.File;
    console.log('O file é ', image);

    if (image) {

      if (user.image) {
        deleteImageFromCloudinary(user.image)
          .catch(err =>
            console.error("Erro ao deletar imagem:", err)
          );
      }

      publicUrl = image.path;
    }
    console.log('Public url ', publicUrl);

    const updatedUser = await UpdateUserById(id, {
      ...safedata.data,
      image: publicUrl
    });

    RegisterActividade(
      `O usuário ${user.nome} atualizou seu perfil`,
      user.id
    ).catch(console.error);

    return res.status(200).json({
      user: updatedUser
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}
export async function updateMyPassword(req: Request, res: Response) {
  const reqExtended = req as extendedRequest
  const id = reqExtended.userId;
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

export async function deleteMe(req: Request, res: Response) {
  const reqExtended = req as extendedRequest

  const id = reqExtended.userId;
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

export async function getUserById(req: Request, res: Response) {

  const { id } = req.params;
  const user = await FindUserById(id as string);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.status(200).json({ user });
}

export async function getAllUsers(req: Request, res: Response) {
  const reqExtended = req as extendedRequest

  const id = reqExtended.userId;
  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  const users = await FindAllUsers();
  return res.status(200).json({ users });
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await FindUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const deletedUser = await DeleteUserById(id);
  if (!deletedUser) {
    return res.status(403).json({ error: "Erro ao deletar usuário" });
  }

  return res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
}

export async function updateUserById(req: Request, res: Response) {
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

  RegisterActividade(`o usuario ${user.nome} teve seu perfil atualizado`, user.id)
  return res.status(200).json({ user: updatedUser });
}

export async function postImagem(req: Request, res: Response) {
  const reqExtended = req as extendedRequest

  const id = reqExtended.userId as string;

  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const user = await FindUserById(id);

  if (!user) {
    return res.status(404).json({ error: "Usuário inexistente" });
  }

  const publicUrl = req.file.path;


  const imagem = await UserCreateImagem(publicUrl, id)

  if (!imagem) {
    return res.status(403).json({
      message: "Erro ao postar"
    });
  }
  res.status(201).json({ message: "Imagem Postada com sucesso", imagem })

}

export async function upDateAvater(req: Request, res: Response) {
  const reqExtended = req as extendedRequest;
  const id = reqExtended.userId;

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhum arquivo enviado"
      });
    }

    const user = await FindUserById(id as string);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    if (user.image) {
      deleteImageFromCloudinary(user.image)
        .catch(err => console.error("Erro ao deletar imagem:", err));
    }

    const publicUrl = req.file.path;

    const avatar = await updateAvatarUser(id as string, {
      image: publicUrl
    });

    if (!avatar) {
      return res.status(500).json({
        error: "Erro ao atualizar avatar"
      });
    }

    RegisterActividade(
      `O usuário ${user.nome} atualizou seu avatar`,
      user.id
    ).catch(console.error);

    return res.status(200).json({
      message: "Imagem de perfil atualizada com sucesso",
      avatar
    });

  } catch (error) {
    console.error("upDateAvater error:", error);

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function getNotifcationsByUser(req: Request, res: Response) {
  const reqExtended = req as extendedRequest

  const id = reqExtended.userId;
  if (!id) {
    return res.status(401).json({ error: "Não autenticado" });
  }


  const noticatios = await getUserNotifications(id as string)

  res.json({ noticatios })
}

export const getMarksByUser = async (req: Request, res: Response) => {

  const reqExtended = req as extendedRequest

  const userId = reqExtended.userId as string
  if (!userId) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  const markeds = await getAllMarks(userId)

  return res.status(200).json({ markeds });
}