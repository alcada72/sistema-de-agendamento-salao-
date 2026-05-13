"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClientById = exports.findAllClient = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const findAllClient = async () => {
    const users = await prisma_1.prisma.user.findMany({
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
    });
    for (const user in users) {
        users[user].image = (0, url_1.getPublicURL)(users[user].image || undefined);
    }
    return users;
};
exports.findAllClient = findAllClient;
const findClientById = async (id) => {
    const user = await prisma_1.prisma.user.findFirst({
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
    });
    if (user?.image) {
        user.image = (0, url_1.getPublicURL)(user.image || undefined);
    }
    return user;
};
exports.findClientById = findClientById;
