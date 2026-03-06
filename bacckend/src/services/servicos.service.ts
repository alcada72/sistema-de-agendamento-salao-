import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { getPublicURL } from "../utils/url";

export const creatServicesService = async (data: Prisma.ServiceCreateInput) => {
  try {

    const newUserAdmin = await prisma.service.create({
      include: {
        images: true
      },
      data
    })
    if (!newUserAdmin) {
      throw new Error("Erro ao criar serviço");
    }
    for (const imageIndex in newUserAdmin.images) {
      newUserAdmin.images[imageIndex].url = getPublicURL(newUserAdmin.images[imageIndex].url)
    }
    return newUserAdmin
  } catch (error) {
    throw error
  }
}

export const findServicesByProfessionalId = async (professionalId: string) => {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          image: true
        }
      }
    },
    where: { professionalId }
  })

  for (const serviceIndex in services) {
    const element = services[serviceIndex].images;
    if (services[serviceIndex].professional) {
      services[serviceIndex].professional.image = getPublicURL(services[serviceIndex].professional.image || undefined)
    }

    for (const imageIndex in element) {
      element[imageIndex].url = getPublicURL(element[imageIndex].url)
    }
  }


  return services
}

export const findServiceById = async (id: string) => {
  const service = await prisma.service.findFirst({
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          image: true,
          images: true,
        }
      },
      comments: {
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
        }
      }
    },
    where: { id }
  })

  if (service) {
    for (const imageIndex in service.images) {
      service.images[imageIndex].url = getPublicURL(service.images[imageIndex].url)
    }

    if (service?.professional) {
      service.professional.image = getPublicURL(service.professional?.image)
      for (const imageIndex in service.professional.images) {
        service.professional.images[imageIndex].url = getPublicURL(service.professional.images[imageIndex].url)
      }
    }
    if (service.comments) {
      for (const imageIndex in service.comments) {
        if (service.comments[imageIndex].user) {
          service.comments[imageIndex].user.image = getPublicURL(service.comments[imageIndex].user.image)
        }
      }
    }
  }



  return service
}

export const deleteServiceByIdservice = async (id: string) => {
  const hasBookings = await prisma.agendamento.findFirst({
    where: { serviceId: id },
    select: { id: true },
  });

  if (hasBookings) {
    return 'Não é possivel eliminar um serviço con agendamento'
  }

  return prisma.service.delete({
    where: { id },
  });
};

export const updateServiceByIdservice = async (id: string, data: Partial<Prisma.ServiceUpdateInput>) => {
  const service = await prisma.service.update({
    where: { id },
    data
  })
  return service
}

export const findAllServices = async () => {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          image: true
        }
      },
      comments: {
        select: {
          id: true,
          commentText: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              nome: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  for (const element of services) {
    if (element.comments) {
      for (const comment of element.comments) {
        if (comment.user && comment.user.image) {
          comment.user.image = getPublicURL(comment.user.image)
        }
      }
    }

    if (element.professional && element.professional.image) {
      element.professional.image = getPublicURL(element.professional.image)
    }

    for (const image of element.images) {
      image.url = getPublicURL(image.url)
    }
  }
  return services
}

export const UserCreateImagem = async (url: string, serviceId: string) => {
  const imagem = await prisma.images.create({
    select: {
      id: true,
      url: true,
    },
    data: {
      url,
      serviceId
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

export const GetImagesByServiceId = async (serviceId: string) => {
  const images = await prisma.images.findMany({
    where: { serviceId }
  })

  if (images) {
    for (const imageIndex in images) {
      images[imageIndex].url = getPublicURL(images[imageIndex].url)
    }
  }

  return images
}

export const GetServiceWithProfessional = async (serviceId: string) => {
  const service = await prisma.service.findFirst({
    where: { id: serviceId },
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true
        }
      }
    },
  })

  if (service) {
    for (const imageIndex in service.images) {
      service.images[imageIndex].url = getPublicURL(service.images[imageIndex].url)
    }
  }


  return service
}

export const getOtherServiceNotId = async (id: string,
  curretPage: number,
  perPage: number) => {

  const services = await prisma.service.findMany({
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          image: true
        }
      },
      comments: {
        select: {
          id: true,
          commentText: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              nome: true,
              image: true
            }
          }
        }
      }
    },
    where: { NOT: { id } },
    orderBy: { createdAt: 'desc' },
    skip: curretPage * perPage,
    take: perPage,

  })

  const aliatorio = services.sort(() => 0.5 - Math.random());

  for (const element of aliatorio) {
    if (element.comments) {
      for (const comment of element.comments) {
        if (comment.user && comment.user.image) {
          comment.user.image = getPublicURL(comment.user.image)
        }
      }
    }

    if (element.professional && element.professional.image) {
      element.professional.image = getPublicURL(element.professional.image)
    }

    for (const image of element.images) {
      image.url = getPublicURL(image.url)
    }
  }

  return aliatorio
}

export const getServicesWithPagination = async (
  curretPage: number,
  perPage: number) => {

  const services = await prisma.service.findMany({
    select: {
      id: true,
      nome: true,
      description: true,
      duration: true,
      price: true,
      professionalId: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          image: true
        }
      },
      comments: {
        select: {
          id: true,
          commentText: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              nome: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    skip: curretPage * perPage,
    take: perPage,

  })
  const aliatorio = services.sort(() => 0.5 - Math.random());

  for (const element of aliatorio) {
    if (element.comments) {
      for (const comment of element.comments) {
        if (comment.user && comment.user.image) {
          comment.user.image = getPublicURL(comment.user.image)
        }
      }
    }

    if (element.professional && element.professional.image) {
      element.professional.image = getPublicURL(element.professional.image)
    }

    for (const image of element.images) {
      image.url = getPublicURL(image.url)
    }
  }

  return aliatorio
}