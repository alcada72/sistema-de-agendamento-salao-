"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSatusAgendamentoById = exports.GetAgendamentoByUser = exports.GetAvailableSlots = exports.FindAllAgendamentos = exports.UpdateAgendamentoById = exports.DeleteAgendamentoById = exports.FindAgendamentoById = exports.FindAgendamentosByServiceId = exports.CreateAgendamento = void 0;
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const CreateAgendamento = async (data) => {
    const { clientId, professionalId, serviceId, date } = data;
    // 🔐 Dados obrigatórios
    if (!clientId || !professionalId || !serviceId || !date) {
        throw new Error("Dados incompletos para criar o agendamento");
    }
    // 🔐 cliente ≠ profissional
    if (clientId === professionalId) {
        throw new Error("O cliente não pode ser o mesmo que o profissional");
    }
    // 🔍 Buscar serviço
    const service = await prisma_1.prisma.service.findUnique({
        where: { id: serviceId }
    });
    if (!service) {
        throw new Error("Serviço inválido");
    }
    // ⏱️ Calcular endDate NO BACKEND
    const endDate = new Date(date.getTime() + service.duration * 60000);
    // ⏱️ horário inválido
    if (endDate <= date) {
        throw new Error("Horário inválido");
    }
    // 🔐 TRANSACTION (muito importante)
    return prisma_1.prisma.$transaction(async (tx) => {
        // 📅 conflito de horário
        const conflito = await tx.agendamento.findFirst({
            where: {
                professionalId,
                status: {
                    in: ["PENDING", "CONFIRMED"]
                },
                AND: [
                    { date: { lt: endDate } },
                    { endDate: { gt: date } }
                ]
            }
        });
        if (conflito) {
            throw new Error("O profissional já possui um agendamento nesse horário");
        }
        return tx.agendamento.create({
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
                professional: {
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
                        price: true
                    }
                },
            },
            data: {
                clientId,
                professionalId,
                serviceId,
                date,
                endDate
            }
        });
    });
};
exports.CreateAgendamento = CreateAgendamento;
const FindAgendamentosByServiceId = async (serviceId) => {
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
            professional: {
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
                    price: true
                }
            },
        },
        where: { serviceId },
        orderBy: { createdAt: 'asc' }
    });
    return agendamentos;
};
exports.FindAgendamentosByServiceId = FindAgendamentosByServiceId;
const FindAgendamentoById = async (id) => {
    const agendamento = await prisma_1.prisma.agendamento.findFirst({
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
            professional: {
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
                    price: true
                }
            },
        },
        where: { id }
    });
    return agendamento;
};
exports.FindAgendamentoById = FindAgendamentoById;
const DeleteAgendamentoById = async (id) => {
    const agendamento = await prisma_1.prisma.agendamento.delete({
        where: { id }
    });
    return agendamento;
};
exports.DeleteAgendamentoById = DeleteAgendamentoById;
const UpdateAgendamentoById = async (id, data) => {
    const agendamentoAtual = await prisma_1.prisma.agendamento.findUnique({
        where: { id }
    });
    if (!agendamentoAtual) {
        throw new Error("Agendamento não encontrado");
    }
    const date = data.date ?? agendamentoAtual.date;
    const professionalId = data.professionalId ?? agendamentoAtual.professionalId;
    const serviceId = data.serviceId ?? agendamentoAtual.serviceId;
    const service = await prisma_1.prisma.service.findUnique({
        where: { id: serviceId }
    });
    if (!service)
        throw new Error("Serviço inválido");
    const endDate = new Date(date.getTime() + service.duration * 60000);
    // 📅 conflito de horário
    const conflito = await prisma_1.prisma.agendamento.findFirst({
        where: {
            professionalId,
            id: { not: id },
            status: { in: ["PENDING", "CONFIRMED"] },
            AND: [
                { date: { lt: endDate } },
                { endDate: { gt: date } }
            ]
        }
    });
    if (conflito) {
        throw new Error("Conflito de horário com outro agendamento");
    }
    return prisma_1.prisma.agendamento.update({
        where: { id },
        data: {
            ...data,
            date,
            endDate
        }
    });
};
exports.UpdateAgendamentoById = UpdateAgendamentoById;
const FindAllAgendamentos = async () => {
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
            professional: {
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
                    price: true
                }
            },
        },
        orderBy: { date: 'desc', }
    });
    return agendamentos;
};
exports.FindAllAgendamentos = FindAllAgendamentos;
const GetAvailableSlots = async ({ professionalId, serviceId, date }) => {
    // 1️⃣ Serviço
    const service = await prisma_1.prisma.service.findUnique({
        where: { id: serviceId }
    });
    if (!service)
        throw new Error("Serviço não encontrado");
    const duration = service.duration;
    // 2️⃣ Início e fim do dia
    const dayStart = new Date(date);
    dayStart.setHours(8, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(18, 0, 0, 0);
    // 3️⃣ Agendamentos existentes
    const bookings = await prisma_1.prisma.agendamento.findMany({
        where: {
            professionalId,
            status: { in: ["PENDING", "CONFIRMED"] },
            date: {
                gte: dayStart,
                lt: dayEnd
            }
        },
        orderBy: { date: "asc" }
    });
    // 4️⃣ Gerar slots
    const slots = [];
    let slotStart = new Date(dayStart);
    while (true) {
        const slotEnd = new Date(slotStart.getTime() + duration * 60000);
        if (slotEnd > dayEnd)
            break;
        const conflito = bookings.some(b => (slotStart < b.endDate &&
            slotEnd > b.date));
        if (!conflito && slotStart > new Date()) {
            slots.push({
                start: new Date(slotStart),
                end: new Date(slotEnd)
            });
        }
        slotStart = new Date(slotStart.getTime() + duration * 60000);
    }
    return slots;
};
exports.GetAvailableSlots = GetAvailableSlots;
const GetAgendamentoByUser = async (id) => {
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
            professional: {
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
            clientId: id
        },
        orderBy: { date: 'desc' }
    });
    for (const agendImdex in agendamentos) {
        const images = agendamentos[agendImdex].service.images;
        agendamentos[agendImdex].client.image = (0, url_1.getPublicURL)(agendamentos[agendImdex].client.image || undefined);
        agendamentos[agendImdex].professional.image = (0, url_1.getPublicURL)(agendamentos[agendImdex].professional.image || undefined);
        for (const imagesIndex in images) {
            images[imagesIndex].url = (0, url_1.getPublicURL)(images[imagesIndex].url);
        }
    }
    return agendamentos;
};
exports.GetAgendamentoByUser = GetAgendamentoByUser;
const updateSatusAgendamentoById = async (id, status) => {
    const agendamento = await prisma_1.prisma.agendamento.update({
        where: { id },
        data: { status }
    });
    return agendamento;
};
exports.updateSatusAgendamentoById = updateSatusAgendamentoById;
