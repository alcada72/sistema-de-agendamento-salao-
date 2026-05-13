"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninUser = exports.signupUserClient = exports.signupUserProfisional = exports.signupUserAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_ts_1 = require("bcrypt-ts");
const signinSchemas_1 = require("../schemas/signinSchemas");
const signupSchemas_1 = require("../schemas/signupSchemas");
const auth_admin_service_1 = require("../services/auth_admin.service");
const notification_service_1 = require("../services/notification.service");
const sendVerification_service_1 = require("../services/sendVerification.service");
const user_service_1 = require("../services/user.service");
const geradorOTP_1 = require("../utils/geradorOTP");
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../utils/prisma");
const url_1 = require("../utils/url");
const signupUserAdmin = async (req, res) => {
    const safedata = signupSchemas_1.SignupAdminSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const verifyUser = await (0, user_service_1.FindUserEmail)(safedata.data.email);
    if (verifyUser) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    const haspass = await (0, bcrypt_ts_1.hash)(safedata.data.password, 10);
    const newAdmin = await (0, auth_admin_service_1.SignupUserAmin)({
        nome: safedata.data.nome,
        email: safedata.data.email,
        password: haspass,
        telefone: safedata.data.telefone || null,
        role: client_1.Role.ADMIN
    });
    if (!newAdmin) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    const token = await (0, jwt_1.createJWT)(newAdmin.id, newAdmin.role);
    return res.status(201).json({
        message: 'Usuario cadastrdo com sucesso',
        user: {
            id: newAdmin.id,
            name: newAdmin.nome,
            email: newAdmin.email,
        },
        token
    });
};
exports.signupUserAdmin = signupUserAdmin;
const signupUserProfisional = async (req, res) => {
    const safedata = signupSchemas_1.SignupAdminSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const image = req.file;
    if (!image) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    const resumeImage = (0, url_1.getPublicFormattedUrl)(image.path);
    const verifyUser = await (0, user_service_1.FindUserEmail)(safedata.data.email);
    if (verifyUser) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    const haspass = await (0, bcrypt_ts_1.hash)(safedata.data.password, 10);
    const newAdmin = await (0, auth_admin_service_1.SignupUserAmin)({
        nome: safedata.data.nome,
        email: safedata.data.email,
        password: haspass,
        telefone: safedata.data.telefone || null,
        image: resumeImage,
        role: client_1.Role.PROFESSIONAL
    });
    if (!newAdmin) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    await (0, notification_service_1.RegisterActividade)(`Profissional ${newAdmin.nome} acbou de se registar`, newAdmin.id);
    const token = await (0, jwt_1.createJWT)(newAdmin.id, newAdmin.role);
    return res.status(201).json({
        message: 'Usuario cadastrdo com sucesso',
        user: {
            id: newAdmin.id,
            name: newAdmin.nome,
            email: newAdmin.email,
            image: newAdmin.image
        },
        token
    });
};
exports.signupUserProfisional = signupUserProfisional;
const signupUserClient = async (req, res) => {
    const safedata = signupSchemas_1.SignupAdminSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const verifyUser = await (0, user_service_1.FindUserEmail)(safedata.data.email);
    const code = (0, geradorOTP_1.generateVerificationCode)();
    if (verifyUser) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    const haspass = await (0, bcrypt_ts_1.hash)(safedata.data.password, 10);
    const newClient = await (0, auth_admin_service_1.SignupUserAmin)({
        nome: safedata.data.nome,
        email: safedata.data.email,
        password: haspass,
        telefone: safedata.data.telefone || null,
        role: client_1.Role.CLIENT,
        emaiverificationid: code,
        expiracaoEmail: new Date(Date.now() + 10 * 60 * 1000),
    });
    if (!newClient) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    try {
        if (newClient.email)
            await (0, sendVerification_service_1.VerifyEmailSend)(newClient.email);
    }
    catch (err) {
        console.error("Erro ao enviar e-mail:", err);
        await prisma_1.prisma.user.delete({ where: { id: newClient.id } });
        return res.status(403).json({
            error: "Erro ao enviar e-mail de verificação. Cadastro cancelado.",
        });
    }
    const token = await (0, jwt_1.createJWT)(newClient.id, newClient.role);
    await (0, notification_service_1.RegisterActividade)(`Cliente ${newClient.nome} acbou de se registar`, newClient.id);
    return res.status(201).json({
        message: 'Usuario cadastrdo com sucesso',
        user: {
            id: newClient.id,
            name: newClient.nome,
            email: newClient.email,
        },
        token
    });
};
exports.signupUserClient = signupUserClient;
const SigninUser = async (req, res) => {
    const safedata = await signinSchemas_1.SigninSchemas.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const verifyEmail = await (0, user_service_1.FindUserEmail)(safedata.data.credencial);
    const verifyTelefone = await (0, user_service_1.findUserByTelefone)(safedata.data.credencial);
    if (!verifyEmail && !verifyTelefone) {
        return res.status(400).json({ error: "E-mail ou senha incorreta!--" });
    }
    const userCredencial = verifyTelefone || verifyEmail;
    if (!userCredencial) {
        return res.status(400).json({ error: "E-mail ou senha incorreta!" });
    }
    const hasPassword = await (0, bcrypt_ts_1.compare)(safedata.data.password, userCredencial.password);
    if (!hasPassword) {
        return res.status(403).json({ error: "E-mail ou senha incorreta...!" });
    }
    const token = await (0, jwt_1.createJWT)(userCredencial.id, userCredencial.role);
    return res.status(200).json({
        message: 'Usuario logado com sucesso',
        user: {
            id: userCredencial.id,
            name: userCredencial.nome,
            email: userCredencial.email,
            role: userCredencial.role
        },
        token
    });
};
exports.SigninUser = SigninUser;
