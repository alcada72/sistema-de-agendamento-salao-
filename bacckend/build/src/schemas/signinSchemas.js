"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SigninSchemas = zod_1.default.object({
    credencial: zod_1.default.string({ message: 'E-mail ou telefone obrigatorio' }).min(5, 'Minimo 5 caractares'),
    password: zod_1.default.string({ message: 'password obrigatorio' }).min(6, 'Minimo 6 caracteres')
});
