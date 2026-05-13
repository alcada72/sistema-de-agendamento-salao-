"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesWithPagination = exports.getOtherServiceNotId = exports.GetServiceWithProfessional = exports.GetImagesByServiceId = exports.UserCreateImagem = exports.findAllServices = exports.updateServiceByIdservice = exports.deleteServiceByIdservice = exports.findServiceById = exports.findServicesByProfessionalId = exports.creatServicesService = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const creatServicesService = async (data) => {
    try {
        const newUserAdmin = await prisma_1.prisma.service.create({
            include: {
                images: true
            },
            data
        });
        if (!newUserAdmin) {
            throw new Error("Erro ao criar serviço");
        }
        for (const imageIndex in newUserAdmin.images) {
            newUserAdmin.images[imageIndex].url = (0, url_1.getPublicURL)(newUserAdmin.images[imageIndex].url);
        }
        return newUserAdmin;
    }
    catch (error) {
        throw error;
    }
};
exports.creatServicesService = creatServicesService;
const findServicesByProfessionalId = async (professionalId) => {
    const services = await prisma_1.prisma.service.findMany({
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
    });
    for (const serviceIndex in services) {
        const element = services[serviceIndex].images;
        if (services[serviceIndex].professional) {
            services[serviceIndex].professional.image = (0, url_1.getPublicURL)(services[serviceIndex].professional.image || undefined);
        }
        for (const imageIndex in element) {
            element[imageIndex].url = (0, url_1.getPublicURL)(element[imageIndex].url);
        }
    }
    return services;
};
exports.findServicesByProfessionalId = findServicesByProfessionalId;
const findServiceById = async (id) => {
    const service = await prisma_1.prisma.service.findFirst({
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
                orderBy: { createdAt: 'desc' },
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
    });
    if (service) {
        for (const imageIndex in service.images) {
            service.images[imageIndex].url = (0, url_1.getPublicURL)(service.images[imageIndex].url);
        }
        if (service?.professional) {
            service.professional.image = (0, url_1.getPublicURL)(service.professional?.image);
            for (const imageIndex in service.professional.images) {
                service.professional.images[imageIndex].url = (0, url_1.getPublicURL)(service.professional.images[imageIndex].url);
            }
        }
        if (service.comments) {
            for (const imageIndex in service.comments) {
                if (service.comments[imageIndex].user) {
                    service.comments[imageIndex].user.image = (0, url_1.getPublicURL)(service.comments[imageIndex].user.image);
                }
            }
        }
    }
    return service;
};
exports.findServiceById = findServiceById;
const deleteServiceByIdservice = async (id) => {
    const hasBookings = await prisma_1.prisma.agendamento.findFirst({
        where: { serviceId: id },
        select: { id: true },
    });
    if (hasBookings) {
        return 'Não é possivel eliminar um serviço con agendamento';
    }
    return prisma_1.prisma.service.delete({
        where: { id },
    });
};
exports.deleteServiceByIdservice = deleteServiceByIdservice;
const updateServiceByIdservice = async (id, data) => {
    const service = await prisma_1.prisma.service.update({
        where: { id },
        data
    });
    return service;
};
exports.updateServiceByIdservice = updateServiceByIdservice;
const findAllServices = async () => {
    const services = await prisma_1.prisma.service.findMany({
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
    });
    for (const element of services) {
        if (element.comments) {
            for (const comment of element.comments) {
                if (comment.user && comment.user.image) {
                    comment.user.image = (0, url_1.getPublicURL)(comment.user.image);
                }
            }
        }
        if (element.professional && element.professional.image) {
            element.professional.image = (0, url_1.getPublicURL)(element.professional.image);
        }
        for (const image of element.images) {
            image.url = (0, url_1.getPublicURL)(image.url);
        }
    }
    return services;
};
exports.findAllServices = findAllServices;
const UserCreateImagem = async (url, serviceId) => {
    const imagem = await prisma_1.prisma.images.create({
        select: {
            id: true,
            url: true,
        },
        data: {
            url,
            serviceId
        }
    });
    if (imagem) {
        return {
            ...imagem,
            url: (0, url_1.getPublicURL)(imagem.url)
        };
    }
    return imagem;
};
exports.UserCreateImagem = UserCreateImagem;
const GetImagesByServiceId = async (serviceId) => {
    const images = await prisma_1.prisma.images.findMany({
        where: { serviceId }
    });
    if (images) {
        for (const imageIndex in images) {
            images[imageIndex].url = (0, url_1.getPublicURL)(images[imageIndex].url);
        }
    }
    return images;
};
exports.GetImagesByServiceId = GetImagesByServiceId;
const GetServiceWithProfessional = async (serviceId) => {
    const service = await prisma_1.prisma.service.findFirst({
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
    });
    if (service) {
        for (const imageIndex in service.images) {
            service.images[imageIndex].url = (0, url_1.getPublicURL)(service.images[imageIndex].url);
        }
    }
    return service;
};
exports.GetServiceWithProfessional = GetServiceWithProfessional;
const getOtherServiceNotId = async (id, curretPage, perPage) => {
    const services = await prisma_1.prisma.service.findMany({
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
    });
    const aliatorio = services.sort(() => 0.5 - Math.random());
    for (const element of aliatorio) {
        if (element.comments) {
            for (const comment of element.comments) {
                if (comment.user && comment.user.image) {
                    comment.user.image = (0, url_1.getPublicURL)(comment.user.image);
                }
            }
        }
        if (element.professional && element.professional.image) {
            element.professional.image = (0, url_1.getPublicURL)(element.professional.image);
        }
        for (const image of element.images) {
            image.url = (0, url_1.getPublicURL)(image.url);
        }
    }
    return aliatorio;
};
exports.getOtherServiceNotId = getOtherServiceNotId;
const getServicesWithPagination = async (curretPage, perPage) => {
    const services = await prisma_1.prisma.service.findMany({
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
    });
    const aliatorio = services.sort(() => 0.5 - Math.random());
    for (const element of aliatorio) {
        if (element.comments) {
            for (const comment of element.comments) {
                if (comment.user && comment.user.image) {
                    comment.user.image = (0, url_1.getPublicURL)(comment.user.image);
                }
            }
        }
        if (element.professional && element.professional.image) {
            element.professional.image = (0, url_1.getPublicURL)(element.professional.image);
        }
        for (const image of element.images) {
            image.url = (0, url_1.getPublicURL)(image.url);
        }
    }
    return aliatorio;
};
exports.getServicesWithPagination = getServicesWithPagination;
