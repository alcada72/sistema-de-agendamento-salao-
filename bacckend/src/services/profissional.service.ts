import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const FindProfissionalById = async (id: string) => {
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
    where: { id, role: 'PROFESSIONAL' }
  })
  return user
}

export const FindAllProfissionais = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nome: true,
      telefone: true,
      email: true,
      role: true,
      image: true,
    },
    where: { role: 'PROFESSIONAL' }
  })

  const aliatorio = users.sort(() => 0.5 - Math.random())

  for (const user in aliatorio) {
    aliatorio[user].image = getPublicURL(aliatorio[user].image || undefined);
  }
  return aliatorio
}