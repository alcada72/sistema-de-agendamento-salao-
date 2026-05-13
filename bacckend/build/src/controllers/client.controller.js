"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const agendamento_service_1 = require("../services/agendamento.service");
const clientes_service_1 = require("../services/clientes.service");
async function getAllClients(req, res) {
    const clients = await (0, clientes_service_1.findAllClient)();
    return res.status(200).json({ clients });
}
async function getClientById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ message: 'informe um id por favor' });
    }
    const user = await (0, clientes_service_1.findClientById)(id);
    if (!user) {
        return res.status(401).json({ message: 'usuario não econtrado' });
    }
    return res.status(200).json({ user });
}
async function getAppointmentsByUserId(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ message: 'informe um id por favor' });
    }
    const user = await (0, clientes_service_1.findClientById)(id);
    if (!user) {
        return res.status(401).json({ message: 'usuario não econtrado' });
    }
    const agenda = await (0, agendamento_service_1.GetAgendamentoByUser)(id);
    if (!agenda) {
        return res.status(403).json({ message: 'usuario não tem agendamento' });
    }
    return res.status(200).json({ agenda });
}
