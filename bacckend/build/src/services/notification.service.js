"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.RegisterActividade = exports.getUserNotifications = exports.sendNotifications = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const sendNotifications = async (message, recevidId, serviceId, senderId) => {
    const notify = await prisma_1.prisma.notification.create({
        data: { message, senderId, recevidId, serviceId },
    });
    return notify;
};
exports.sendNotifications = sendNotifications;
const getUserNotifications = async (recevidId) => {
    const notificationRead = await prisma_1.prisma.notification.findMany({
        where: { recevidId },
        orderBy: { createdAt: 'desc' },
        include: {
            sender: {
                select: {
                    id: true,
                    nome: true,
                    image: true,
                    role: true,
                },
            },
        },
    });
    for (const item of notificationRead) {
        if (item.sender) {
            item.sender.image = (0, url_1.getPublicURL)(item.sender.image);
        }
    }
    return notificationRead;
};
exports.getUserNotifications = getUserNotifications;
const RegisterActividade = async (message, senderId, serviceId) => {
    const admins = await prisma_1.prisma.user.findMany({
        where: { role: 'ADMIN' }
    });
    for (const admin of admins) {
        await (0, exports.sendNotifications)(message, admin.id, serviceId, senderId);
    }
    return admins;
};
exports.RegisterActividade = RegisterActividade;
const markAsRead = async (id) => {
    return prisma_1.prisma.notification.update({
        where: { id },
        data: {
            isRead: true,
        }
    });
};
exports.markAsRead = markAsRead;
