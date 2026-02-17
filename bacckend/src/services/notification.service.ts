import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"



export const sendNotifications = async (message: string, recevidId: string, serviceId?: string, senderId?: string) => {
  const notify = await prisma.notification.create({
    data: { message, senderId, recevidId, serviceId },

  })

  return notify
}

export const getUserNotifications = async (recevidId: string) => {
  const notificationRead = await prisma.notification.findMany({
    where: { recevidId },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: {
        select: {
          id: true,
          nome: true,
          image: true,
        },
      },
    },
  })

  for (const item of notificationRead) {
    if (item.sender) {
      item.sender.image = getPublicURL(item.sender.image)
    }
  }

  return notificationRead
}

export const RegisterActividade = async (message: string, senderId: string, serviceId?: string,) => {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' }
  })

  for (const admin of admins) {
    await sendNotifications(message, admin.id, senderId, serviceId)
  }

  return admins
}