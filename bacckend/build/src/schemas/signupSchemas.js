"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupAdminSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupAdminSchema = zod_1.default.object({
    nome: zod_1.default.string({ error: "nome Obrigatório" }).min(6, "Minimo 6 caractres"),
    email: zod_1.default.email({ error: "E-mail Obrigatório" }),
    password: zod_1.default.string({ error: "Password Obrigatório" }).min(6, "No minimo 6 caractares"),
    telefone: zod_1.default.string().min(9, "pelo menos 9 numeros").optional()
});
