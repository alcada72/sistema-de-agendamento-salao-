import { prisma } from "../utils/prisma";
import { getPublicURL } from "../utils/url";


export const findAllClient = async () => {
  const users= await prisma.user.findMany({
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
  for (const user in users) {
    users[user].image = getPublicURL(users[user].image || undefined);
  }


  return users
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


  if (user?.image) {
      user.image = getPublicURL(user.image || undefined);
  }


  return user
}