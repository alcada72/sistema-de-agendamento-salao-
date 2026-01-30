import { Prisma } from "@prisma/client"
import { prisma } from "../utils/prisma"

export const CreateImagesService = async (data: Prisma.ImagesCreateInput) => {
  const newImage = await prisma.images.create({ data })
  return newImage
}

export const GetImagesByServiceId = async (serviceId: string) => {
  const images = await prisma.images.findMany({
    where: { serviceId }
  })
  return images
}

export const GetImagesByUserId = async (userId: string) => {
  const images = await prisma.images.findMany({
    where: { userId }
  })
  return images
}

export const DeleteImageById = async (id: string) => {
  const image = await prisma.images.delete({
    where: { id }
  })
  return image
}