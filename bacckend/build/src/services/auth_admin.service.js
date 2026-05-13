"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupUserAmin = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const SignupUserAmin = async (data) => {
    const newUserAdmin = await prisma_1.prisma.user.create({ data });
    if (newUserAdmin) {
        return {
            ...newUserAdmin,
            image: (0, url_1.getPublicURL)(newUserAdmin.image || undefined)
        };
    }
    return newUserAdmin;
};
exports.SignupUserAmin = SignupUserAmin;
