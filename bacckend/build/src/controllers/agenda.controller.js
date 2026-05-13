"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = createAppointment;
exports.getAppointmentById = getAppointmentById;
exports.getAllAppointments = getAllAppointments;
exports.updateAppointmentById = updateAppointmentById;
exports.deleteAppointmentById = deleteAppointmentById;
exports.comfirmAppointmentById = comfirmAppointmentById;
const client_1 = require("@prisma/client");
const agendaSchemas_1 = require("../schemas/agendaSchemas");
const agendamento_service_1 = require("../services/agendamento.service");
const notification_service_1 = require("../services/notification.service");
const user_service_1 = require("../services/user.service");
async function createAppointment(req, res) {
    const userId = req.userId;
    const safedata = agendaSchemas_1.agendaSchemas.safeParse(req.body);
    if (!safedata.success) {
        return res.status(400).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    if (!userId) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const user = await (0, user_service_1.FindUserById)(userId);
    if (!user) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const agenda = await (0, agendamento_service_1.CreateAgendamento)({
        ...safedata.data,
        clientId: userId,
        date: new Date(safedata.data.date)
    });
    await (0, notification_service_1.RegisterActividade)(`Cliente ${user?.nome} agendou o serviço ${agenda.service.nome} `, user.id, agenda.service.id);
    await (0, notification_service_1.sendNotifications)(`Cliente ${user?.nome} agendou o serviço ${agenda.service.nome} `, agenda.professional.id, agenda.service.id, user.id);
    // Implementation here
    return res.status(201).json({ message: "Agendamento criado com sucesso", agenda });
}
async function getAppointmentById(req, res) {
    const { id } = req.params;
    if (!id.trim()) {
        return res.json({ error: 'Informe um id por favor' });
    }
    const agenda = await (0, agendamento_service_1.FindAgendamentoById)(id);
    if (!agenda) {
        return res.json({ error: 'Agendamento não existe' });
    }
    res.status(200).json({ agenda });
}
async function getAllAppointments(req, res) {
    const agenda = await (0, agendamento_service_1.FindAllAgendamentos)();
    res.status(200).json({ agenda });
}
async function updateAppointmentById(req, res) {
    const { id } = req.params;
    const { date } = req.body;
    if (!id.trim()) {
        return res.json({ error: 'Informe um id por favor' });
    }
    if (!date.trim()) {
        return res.json({ error: 'informe outra data' });
    }
    const agendado = await (0, agendamento_service_1.FindAgendamentoById)(id);
    if (!agendado) {
        return res.json({ error: 'agenda não existente' });
    }
    const agenda = await (0, agendamento_service_1.UpdateAgendamentoById)(agendado.id, {
        ...agendado,
        date: new Date(date)
    });
    if (agenda) {
        await (0, notification_service_1.RegisterActividade)(`uma agenda foi atualizada `, agenda.clientId, agenda.serviceId);
        await (0, notification_service_1.sendNotifications)(`uma agenda foi atualizada `, agenda.professionalId, agenda.serviceId, agenda.clientId);
        return res.status(200).json({ message: 'agenda atualizada com sucesso', agenda });
    }
    else {
        return res.status(403).json({ error: 'erro ao atualizar a agenda' });
    }
}
async function deleteAppointmentById(req, res) {
    const { id } = req.params;
    if (!id.trim()) {
        return res.status(403).json({ error: 'Informe um id por favor' });
    }
    const agendado = await (0, agendamento_service_1.FindAgendamentoById)(id);
    if (!agendado) {
        return res.status(403).json({ error: 'agenda não existente' });
    }
    const agenda = await (0, agendamento_service_1.DeleteAgendamentoById)(agendado.id);
    if (agenda) {
        await (0, notification_service_1.RegisterActividade)(`uma agenda foi excluida `, agenda.clientId, agenda.serviceId);
        await (0, notification_service_1.sendNotifications)(`uma agenda foi excluida `, agenda.professionalId, agenda.serviceId, agenda.clientId);
        return res.status(200).json({ message: 'agenda excluida com sucesso' });
    }
    else {
        return res.status(403).json({ error: 'erro ao excluir a agenda' });
    }
}
async function comfirmAppointmentById(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !id.trim()) {
        return res.status(400).json({ error: "Informe um id por favor" });
    }
    if (!status) {
        return res.status(400).json({ error: "Informe o status do agendamento" });
    }
    // ✅ valida enum
    if (!Object.values(client_1.AgendamentoStatus).includes(status)) {
        return res.status(400).json({
            error: "Status inválido",
            validos: Object.values(client_1.AgendamentoStatus),
        });
    }
    const agendado = await (0, agendamento_service_1.FindAgendamentoById)(id);
    if (!agendado) {
        return res.status(404).json({ error: "Agenda não existente" });
    }
    const user = await (0, user_service_1.FindUserById)(agendado.client.id);
    if (!user) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const agendaAtualizada = await (0, agendamento_service_1.updateSatusAgendamentoById)(agendado.id, status);
    if (!agendaAtualizada) {
        return res.status(400).json({
            message: "Erro ao atualizar",
        });
    }
    await (0, notification_service_1.RegisterActividade)(`uma agenda foi atualizada para ${agendaAtualizada.status} `, agendaAtualizada.clientId, agendaAtualizada.serviceId);
    if (agendaAtualizada.status == 'CONFIRMED' || agendaAtualizada.status == 'COMPLETED') {
        await (0, notification_service_1.sendNotifications)(`Cliente ${user?.nome} a sua agenda foi ${agendaAtualizada.status} `, agendaAtualizada.clientId, agendaAtualizada.serviceId, agendaAtualizada.professionalId);
    }
    return res.status(200).json({
        message: "Agendamento atualizado com sucesso",
        agenda: agendaAtualizada,
    });
}
4;
