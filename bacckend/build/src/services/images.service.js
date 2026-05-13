"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteImageById = exports.GetImagesByUserId = exports.GetImagesByServiceId = exports.CreateImagesService = void 0;
const prisma_1 = require("../utils/prisma");
const CreateImagesService = async (data) => {
    const newImage = await prisma_1.prisma.images.create({ data });
    return newImage;
};
exports.CreateImagesService = CreateImagesService;
const GetImagesByServiceId = async (serviceId) => {
    const images = await prisma_1.prisma.images.findMany({
        where: { serviceId }
    });
    return images;
};
exports.GetImagesByServiceId = GetImagesByServiceId;
const GetImagesByUserId = async (userId) => {
    const images = await prisma_1.prisma.images.findMany({
        where: { userId }
    });
    return images;
};
exports.GetImagesByUserId = GetImagesByUserId;
const DeleteImageById = async (id) => {
    const image = await prisma_1.prisma.images.delete({
        where: { id }
    });
    return image;
};
exports.DeleteImageById = DeleteImageById;
