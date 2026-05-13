"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarksByUser = void 0;
exports.getMe = getMe;
exports.updateMe = updateMe;
exports.updateMyPassword = updateMyPassword;
exports.deleteMe = deleteMe;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.deleteUserById = deleteUserById;
exports.updateUserById = updateUserById;
exports.postImagem = postImagem;
exports.upDateAvater = upDateAvater;
exports.getNotifcationsByUser = getNotifcationsByUser;
const bcrypt_ts_1 = require("bcrypt-ts");
const update_user_1 = require("../schemas/update-user");
const bookMark_service_1 = require("../services/bookMark.service");
const notification_service_1 = require("../services/notification.service");
const user_service_1 = require("../services/user.service");
const url_1 = require("../utils/url");
async function getMe(req, res) {
    const id = req.userId;
    if (!id) {
        console.log("usuario não encontrado");
        return res.status(401).json({ error: "Não autenticado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json({ user });
}
async function updateMe(req, res) {
    const id = req.userId;
    const safedata = update_user_1.upDateUserSchema.safeParse(req.body);
    console.log(safedata);
    console.log(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    if (!id) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const updatedUser = await (0, user_service_1.UpdateUserById)(id, safedata.data);
    if (!updatedUser) {
        return res.status(403).json({ error: "Erro ao atualizar usuário" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} atualizou seu perfil`, user.id);
    return res.status(200).json({ user: updatedUser });
}
async function updateMyPassword(req, res) {
    const id = req.userId;
    const safedata = update_user_1.updatePasswordSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    if (!id) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const haspass = await (0, bcrypt_ts_1.hash)(safedata.data.password, 10);
    const updatedUser = await (0, user_service_1.updatePasswordUser)(id, { password: haspass });
    if (!updatedUser) {
        return res.status(403).json({ error: "Erro ao atualizar usuário" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} atualizou sua senha`, user.id);
    await (0, notification_service_1.sendNotifications)(`Olá ${user.nome} a sua senha foi atualizada com sucesso!`, user.id);
    return res.status(200).json({ user: updatedUser });
}
async function deleteMe(req, res) {
    // Implementation here
    const id = req.userId;
    if (!id) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const deletedUser = await (0, user_service_1.DeleteUserById)(id);
    if (!deletedUser) {
        return res.status(403).json({ error: "Erro ao deletar usuário" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} deletou sua conta`, user.id);
    return res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
}
async function getUserById(req, res) {
    const { id } = req.params;
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json({ user });
}
async function getAllUsers(req, res) {
    const id = req.userId;
    if (!id) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const users = await (0, user_service_1.FindAllUsers)();
    return res.status(200).json({ users });
}
async function deleteUserById(req, res) {
    const { id } = req.params;
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const deletedUser = await (0, user_service_1.DeleteUserById)(id);
    if (!deletedUser) {
        return res.status(403).json({ error: "Erro ao deletar usuário" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} teve sua conta deletada`, user.id);
    return res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
}
async function updateUserById(req, res) {
    const { id } = req.params;
    const safedata = update_user_1.upDateUserSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(401).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const updatedUser = await (0, user_service_1.UpdateUserById)(id, safedata.data);
    if (!updatedUser) {
        return res.status(403).json({ error: "Erro ao atualizar usuário" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} teve seu perfil atualizado`, user.id);
    return res.status(200).json({ user: updatedUser });
}
async function postImagem(req, res) {
    const id = req.userId;
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário inexistente" });
    }
    const publicUrl = (0, url_1.getPublicFormattedUrl)(req.file.path);
    const imagem = await (0, user_service_1.UserCreateImagem)(publicUrl, id);
    if (!imagem) {
        res.status(403).json({ message: "Erro ao postar" });
    }
    res.status(201).json({ message: "Imagem Postada com sucesso", imagem });
}
async function upDateAvater(req, res) {
    const id = req.userId;
    if (!req.file) {
        return res.status(403).json({ error: "Nenhum arquivo enviado" });
    }
    const user = await (0, user_service_1.FindUserById)(id);
    if (!user) {
        return res.status(403).json({ error: "Usuário inexistente" });
    }
    const publicUrl = (0, url_1.getPublicFormattedUrl)(req.file.path);
    const avatar = await (0, user_service_1.updateAvatarUser)(id, { image: publicUrl });
    if (!avatar) {
        return res.status(403).json({ error: "Erro ao atualizar avatar" });
    }
    await (0, notification_service_1.RegisterActividade)(`o usuario ${user.nome} atualizou seu avatar`, user.id);
    res.status(201).json({ message: "Imagem de perfil atualizada com sucesso com sucesso", });
}
async function getNotifcationsByUser(req, res) {
    const id = req.userId;
    if (!id) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const noticatios = await (0, notification_service_1.getUserNotifications)(id);
    res.json({ noticatios });
}
const getMarksByUser = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const markeds = await (0, bookMark_service_1.getAllMarks)(userId);
    return res.status(200).json({ markeds });
};
exports.getMarksByUser = getMarksByUser;
