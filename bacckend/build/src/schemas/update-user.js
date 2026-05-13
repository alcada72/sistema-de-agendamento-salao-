"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.upDateUserSchema = void 0;
const zod_1 = require("zod");
exports.upDateUserSchema = zod_1.z.object({
    nome: zod_1.z.string({ error: "nome Obrigatório" }).min(10, "Minimo 6 caractres"),
    email: zod_1.z.email({ error: "E-mail Obrigatório" }),
    image: zod_1.z.string().optional(),
    telefone: zod_1.z.string().min(9, "pelo menos 9 numeros").optional()
});
exports.updatePasswordSchema = zod_1.z.object({
    password: zod_1.z.string({ error: "Password Obrigatório" }).min(6, "No minimo 6 caractares"),
    confirmPassword: zod_1.z.string({ error: "Confirmar Password Obrigatório" }).min(6, "No minimo 6 caractares")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
});
