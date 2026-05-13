"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsers = exports.DeleteUserById = exports.updatePasswordUser = exports.updateAvatarUser = exports.UpdateUserById = exports.GetImagesByUserId = exports.UserCreateImagem = exports.findUserByTelefone = exports.FindUserEmail = exports.FindUserById = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const FindUserById = async (id) => {
    const user = await prisma_1.prisma.user.findFirst({
        select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
            role: true,
            image: true,
            isVerified: true,
            images: {
                select: {
                    id: true,
                    url: true,
                    createdAt: true
                }
            },
        },
        where: { id }
    });
    if (user) {
        if (user?.images) {
            for (let image of user.images) {
                image.url = (0, url_1.getPublicURL)(image.url);
            }
        }
        return {
            ...user,
            image: (0, url_1.getPublicURL)(user.image || undefined),
        };
    }
    return user;
};
exports.FindUserById = FindUserById;
const FindUserEmail = async (email) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { email }
    });
    return user;
};
exports.FindUserEmail = FindUserEmail;
const findUserByTelefone = async (telefone) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { telefone }
    });
    return user;
};
exports.findUserByTelefone = findUserByTelefone;
const UserCreateImagem = async (url, userId) => {
    const imagem = await prisma_1.prisma.images.create({
        data: {
            url,
            userId
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
const GetImagesByUserId = async (userId) => {
    const images = await prisma_1.prisma.images.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    nome: true,
                    image: true
                }
            }
        },
        where: { userId }
    });
    for (const imageIndex in images) {
        images[imageIndex].url = (0, url_1.getPublicURL)(images[imageIndex].url);
        if (images[imageIndex].user) {
            images[imageIndex].user.image = (0, url_1.getPublicURL)(images[imageIndex].user.image || undefined);
        }
    }
    return images;
};
exports.GetImagesByUserId = GetImagesByUserId;
const UpdateUserById = async (id, data) => {
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id },
        data
    });
    return updatedUser;
};
exports.UpdateUserById = UpdateUserById;
const updateAvatarUser = async (id, image) => {
    return await prisma_1.prisma.user.update({
        where: { id },
        data: image,
    });
};
exports.updateAvatarUser = updateAvatarUser;
const updatePasswordUser = async (id, password) => {
    return await prisma_1.prisma.user.update({
        where: { id },
        data: password,
    });
};
exports.updatePasswordUser = updatePasswordUser;
const DeleteUserById = async (id) => {
    const deletedUser = await prisma_1.prisma.user.delete({
        where: { id }
    });
    return deletedUser;
};
exports.DeleteUserById = DeleteUserById;
const FindAllUsers = async () => {
    const users = await prisma_1.prisma.user.findMany({
        select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
            role: true,
            image: true,
            images: true,
        },
        orderBy: { createdAt: 'desc' }
    });
    return users;
};
exports.FindAllUsers = FindAllUsers;
