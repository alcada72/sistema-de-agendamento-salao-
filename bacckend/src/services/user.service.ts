
import { Prisma } from "@prisma/client"
import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const FindUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      nome: true,
      telefone: true,
      email: true,
      role: true,
      image: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
    },
    where: { id }
  })


  if (user) {
    if (user?.images) {
      for (let image of user.images) {
        image.url = getPublicURL(image.url);
      }
    }
    return {
      ...user,
      image: getPublicURL(user.image || undefined),
    }
  }


  return user
}

export const FindUserEmail = async (email: string) => {
  const user = await prisma.user.findFirst({

    where: { email }
  })

  
  return user
}

export const findUserByTelefone = async (telefone: string) => {
  const user = await prisma.user.findFirst({
    where: { telefone }
  })
  return user
}

export const UserCreateImagem = async (url: string, userId: string) => {
  const imagem = await prisma.images.create({
    data: {
      url,
      userId
    }
  })
  if (imagem) {
    return {
      ...imagem,
      url: getPublicURL(imagem.url)
    }
  }
  return imagem
}

export const GetImagesByUserId = async (userId: string) => {
  const images = await prisma.images.findMany({
    include: {
      user: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      }
    },
    where: { userId }
  })

  for (const imageIndex in images) {
    images[imageIndex].url = getPublicURL(images[imageIndex].url)
    if (images[imageIndex].user) {
      images[imageIndex].user.image = getPublicURL(images[imageIndex].user.image || undefined)
    }
  }

  return images
}

export const UpdateUserById = async (
  id: string,
  data: Prisma.UserUpdateInput) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data
  })
  return updatedUser
}

export const updateAvatarUser = async (
  id: string,
  image: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({
    where: { id },
    data: image,
  });
};

export const DeleteUserById = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id }
  })
  return deletedUser
}

export const FindAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nome: true,
      telefone: true,
      email: true,
      role: true,
      image: true,
      images: true,
    },
    orderBy: { createdAt: 'desc' }
  })
  return users
}

