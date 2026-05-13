"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommentByServiceId = exports.createComments = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const createComments = async (serviceId, userId, commentText) => {
    const coment = await prisma_1.prisma.comments.create({
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
        },
        data: {
            serviceId, userId, commentText
        }
    });
    if (coment.user) {
        coment.user.image = (0, url_1.getPublicURL)(coment.user.image);
    }
    return coment;
};
exports.createComments = createComments;
const findCommentByServiceId = async (serviceId) => {
    const comments = await prisma_1.prisma.comments.findMany({
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
        },
        where: {
            serviceId
        }
    });
    for (const imageIndex in comments) {
        if (comments[imageIndex].user) {
            comments[imageIndex].user.image = (0, url_1.getPublicURL)(comments[imageIndex].user.image);
        }
    }
    return true;
};
exports.findCommentByServiceId = findCommentByServiceId;
