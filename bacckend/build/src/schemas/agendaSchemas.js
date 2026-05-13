"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendaSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
exports.agendaSchemas = zod_1.default.object({
    serviceId: zod_1.default.string({ message: 'ID do serviço obrigatorio' }),
    professionalId: zod_1.default.string({ message: 'ID do profissional obrigatorio' }),
    date: zod_1.default.string({ message: 'Data do agendamento obrigatorio' }).refine((date) => !isNaN(Date.parse(date)), { message: 'Data do agendamento invalida' }),
});
