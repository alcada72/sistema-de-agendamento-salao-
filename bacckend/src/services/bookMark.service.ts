import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const mark = async (userId: string, serviceId: string,) => {
  const mark = await prisma.bookMark.create({
    data: { userId, serviceId },
  })
  return mark
}

export const unMark = async (userId: string, serviceId: string,) => {
  const mark = await prisma.bookMark.deleteMany({
    where: { userId, serviceId },
  })
  return mark
}

export const getAllMarks = async (userId: string) => {
  const marks = await prisma.bookMark.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true,      
      service: {
        select: {
          id: true,
          nome: true,
          description: true,
          duration: true,
          price: true,
          images: {
            select: {
              id: true,
              url: true,
              createdAt: true
            }
          },
        }
      }
    },
  })

  for (const mark of marks) {
    if (mark.service?.images) {
      for (const image of mark.service.images) {
        image.url = getPublicURL(image.url)
      }
    }
  }

  return marks
}

export const FindMark = async (userId: string, serviceId: string) => {
  const mark = await prisma.bookMark.findFirst({
    where: { userId, serviceId },
  })

  return mark ? true : false
}