"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProfessionals = getAllProfessionals;
exports.GetAllAgendaByProfissional = GetAllAgendaByProfissional;
const profissional_service_1 = require("../services/profissional.service");
async function getAllProfessionals(req, res) {
    const profissionais = await (0, profissional_service_1.FindAllProfissionais)();
    res.status(200).json({ profissionais });
}
async function GetAllAgendaByProfissional(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ message: 'informe um id por favor' });
    }
    const user = await (0, profissional_service_1.FindProfissionalById)(id);
    if (!user) {
        return res.status(401).json({ message: 'Profissional não econtrado' });
    }
    const agenda = await (0, profissional_service_1.FindAllAgendamentoByProfissional)(id);
    if (!agenda) {
        return res.status(403).json({ message: 'usuario não tem agendamento' });
    }
    return res.status(200).json({ agenda });
}
