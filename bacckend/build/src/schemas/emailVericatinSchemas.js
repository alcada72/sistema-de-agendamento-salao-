"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmEmailSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ConfirmEmailSchema = zod_1.default.object({
    token: zod_1.default
        .string({ message: "Token de confirmação é obrigatório" })
        .min(6, "O token deve ter pelo menos 6 caracteres"),
});
