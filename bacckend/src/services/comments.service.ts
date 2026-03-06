import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const createComments = async (serviceId: string, userId: string, commentText: string) => {
  const coment = await prisma.comments.create({
   select: {
      id: true,
      serviceId: true,
      commentText: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      }
    },
    data: {
      serviceId, userId, commentText
    }
  })

  if (coment.user) {
    coment.user.image = getPublicURL(coment.user.image)
  }
  return coment
}

export const findCommentByServiceId = async (serviceId: string,) => {
  const comments = await prisma.comments.findMany({
    select: {
      id: true,
      serviceId: true,
      commentText: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      }
    },
    where: {
      serviceId
    }
  })


  for (const imageIndex in comments) {
    if (comments[imageIndex].user) {
      comments[imageIndex].user.image = getPublicURL(comments[imageIndex].user.image)
    }
  }

  return true
}