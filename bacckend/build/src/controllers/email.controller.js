"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reeSendEmail = exports.verifacationEmail = void 0;
const emailVericatinSchemas_1 = require("../schemas/emailVericatinSchemas");
const sendVerification_service_1 = require("../services/sendVerification.service");
const geradorOTP_1 = require("../utils/geradorOTP");
const prisma_1 = require("../utils/prisma");
const verifacationEmail = async (req, res) => {
    const safeData = emailVericatinSchemas_1.ConfirmEmailSchema.safeParse(req.body);
    if (!safeData.success) {
        return res.status(400).json({
            error: safeData.error.flatten().fieldErrors,
        });
    }
    const { token } = safeData.data;
    const user = await prisma_1.prisma.user.findUnique({
        where: { emaiverificationid: token },
    });
    if (!user) {
        return res
            .status(403)
            .json({ error: "Código de verificação inválido ou expirado." });
    }
    if (user.expiracaoEmail && user.expiracaoEmail < new Date()) {
        return res.status(400).json({ error: "Código expirado!" });
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: {
            emailverificadIn: new Date(),
            emaiverificationid: null,
            expiracaoEmail: null,
            isVerified: true,
        },
    });
    if (!updatedUser) {
        return res.status(500).json({ error: "Erro ao confirmar e-mail" });
    }
    return res.status(200).json({ message: "E-mail confirmado com sucesso!" });
};
exports.verifacationEmail = verifacationEmail;
const reeSendEmail = async (req, res) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: req.userId },
    });
    if (!user)
        return res.status(403).json({ error: "Acesso negado" });
    if (user.expiracaoEmail && user.expiracaoEmail > new Date()) {
        return res.status(400).json({
            error: "Aguarde antes de solicitar novo código.",
        });
    }
    const code = (0, geradorOTP_1.generateVerificationCode)();
    const update = await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: {
            emaiverificationid: code,
            expiracaoEmail: new Date(Date.now() + 10 * 60 * 1000),
            isVerified: false,
        },
    });
    if (!update)
        return res.json({ error: "erro ao enviar código" });
    const sendCode = await (0, sendVerification_service_1.VerifyEmailSend)(update.email);
    if (!sendCode)
        return res.json({ error: "erro ao enviar código" });
    return res
        .status(200)
        .json({ message: "Código reenviado com sucesso! para: " + update.email });
};
exports.reeSendEmail = reeSendEmail;
