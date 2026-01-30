import { prisma } from "../utils/prisma"


export const findAllClient = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      nome: true,
      image: true,
      role: true,
      images: {
        select: {
          id: true,
          url: true,
          userId: true
        }
      }
    },
    where: {
      role: 'CLIENT'
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findClientById = async (id: string) => {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      nome: true,
      image: true,
      role: true,
      images: {
        select: {
          id: true,
          url: true,
          userId: true
        }
      }
    },
    where: {
      id: id,
      role: 'CLIENT'
    },
    orderBy: { createdAt: 'desc' }
  })

  return user
}