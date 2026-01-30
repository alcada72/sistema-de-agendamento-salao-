import type { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { getPublicURL } from '../utils/url';

export const SignupUserAmin = async (data: Prisma.UserCreateInput) => {
  const newUserAdmin = await prisma.user.create({ data })

  if (newUserAdmin) {
    return {
      ...newUserAdmin,
      image: getPublicURL(newUserAdmin.image || undefined)
    }
  }

  return newUserAdmin
}