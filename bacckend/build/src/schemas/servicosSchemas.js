"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicosSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.servicosSchema = zod_1.default.object({
    nome: zod_1.default.string({ message: 'Nome do serviço obrigatorio' }).min(3, 'Minimo 3 caractares'),
    description: zod_1.default.string({ message: 'Descrição do serviço obrigatorio' }).min(10, 'Minimo 10 caractares'),
    duration: zod_1.default.string({ message: 'Duração obrigatoria' }),
    price: zod_1.default.string({ message: 'Preço obrigatorio' }),
    professionalId: zod_1.default.string({ message: 'Profissional obrigatorio' }).optional(),
});
