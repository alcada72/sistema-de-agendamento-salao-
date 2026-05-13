"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMark = exports.getAllMarks = exports.unMark = exports.mark = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const mark = async (userId, serviceId) => {
    const mark = await prisma_1.prisma.bookMark.create({
        data: { userId, serviceId },
    });
    return mark;
};
exports.mark = mark;
const unMark = async (userId, serviceId) => {
    const mark = await prisma_1.prisma.bookMark.deleteMany({
        where: { userId, serviceId },
    });
    return mark;
};
exports.unMark = unMark;
const getAllMarks = async (userId) => {
    const marks = await prisma_1.prisma.bookMark.findMany({
        where: { userId },
        select: {
            id: true,
            createdAt: true,
            service: {
                select: {
                    id: true,
                    nome: true,
                    description: true,
                    duration: true,
                    price: true,
                    images: {
                        select: {
                            id: true,
                            url: true,
                            createdAt: true
                        }
                    },
                }
            }
        },
    });
    for (const mark of marks) {
        if (mark.service?.images) {
            for (const image of mark.service.images) {
                image.url = (0, url_1.getPublicURL)(image.url);
            }
        }
    }
    return marks;
};
exports.getAllMarks = getAllMarks;
const FindMark = async (userId, serviceId) => {
    const mark = await prisma_1.prisma.bookMark.findFirst({
        where: { userId, serviceId },
    });
    return mark ? true : false;
};
exports.FindMark = FindMark;
