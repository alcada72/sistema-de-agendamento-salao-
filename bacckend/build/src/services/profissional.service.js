"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllAgendamentoByProfissional = exports.FindAllProfissionais = exports.FindProfissionalById = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const FindProfissionalById = async (id) => {
    const user = await prisma_1.prisma.user.findFirst({
        select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
            role: true,
            image: true,
            images: {
                select: {
                    id: true,
                    url: true,
                    createdAt: true
                }
            },
        },
        where: { id, role: 'PROFESSIONAL' }
    });
    return user;
};
exports.FindProfissionalById = FindProfissionalById;
const FindAllProfissionais = async () => {
    const users = await prisma_1.prisma.user.findMany({
        select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
            role: true,
            image: true,
        },
        where: { role: 'PROFESSIONAL' }
    });
    const aliatorio = users.sort(() => 0.5 - Math.random());
    for (const user in aliatorio) {
        aliatorio[user].image = (0, url_1.getPublicURL)(aliatorio[user].image || undefined);
    }
    return aliatorio;
};
exports.FindAllProfissionais = FindAllProfissionais;
const FindAllAgendamentoByProfissional = async (professionalId) => {
    const agendamentos = await prisma_1.prisma.agendamento.findMany({
        select: {
            id: true,
            date: true,
            endDate: true,
            status: true,
            createdAt: true,
            client: {
                select: {
                    id: true,
                    nome: true,
                    image: true
                }
            },
            service: {
                select: {
                    id: true,
                    nome: true,
                    description: true,
                    duration: true,
                    price: true,
                    images: true,
                }
            },
        },
        where: {
            professionalId
        },
        orderBy: { date: 'desc' }
    });
    for (const agendImdex in agendamentos) {
        const images = agendamentos[agendImdex].service.images;
        agendamentos[agendImdex].client.image = (0, url_1.getPublicURL)(agendamentos[agendImdex].client.image || undefined);
        for (const imagesIndex in images) {
            images[imagesIndex].url = (0, url_1.getPublicURL)(images[imagesIndex].url);
        }
    }
    return agendamentos;
};
exports.FindAllAgendamentoByProfissional = FindAllAgendamentoByProfissional;
