"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMark = exports.ToogleMarkService = void 0;
exports.creatServicos = creatServicos;
exports.commentServico = commentServico;
exports.getServiceById = getServiceById;
exports.getAllServices = getAllServices;
exports.updateServiceById = updateServiceById;
exports.deleteServiceById = deleteServiceById;
exports.getOtherServicesById = getOtherServicesById;
exports.getAllServicesWithPagination = getAllServicesWithPagination;
const comment_1 = require("../schemas/comment");
const parpage_1 = require("../schemas/parpage");
const servicosSchemas_1 = require("../schemas/servicosSchemas");
const bookMark_service_1 = require("../services/bookMark.service");
const comments_service_1 = require("../services/comments.service");
const notification_service_1 = require("../services/notification.service");
const profissional_service_1 = require("../services/profissional.service");
const servicos_service_1 = require("../services/servicos.service");
const user_service_1 = require("../services/user.service");
const url_1 = require("../utils/url");
async function creatServicos(req, res) {
    const safedata = servicosSchemas_1.servicosSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(400).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const images = req.files;
    if (images.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    if (!req.userId || req.role !== 'ADMIN') {
        return res.status(403).json({ error: "Acesso negado" });
    }
    if (safedata.data.professionalId) {
        const profissional = await (0, profissional_service_1.FindProfissionalById)(safedata.data.professionalId);
        if (!profissional) {
            return res.status(404).json({ error: "Profissional não encontrado" });
        }
    }
    const imagem = images.map(image => (0, url_1.getPublicFormattedUrl)(image.path));
    const newServico = await (0, servicos_service_1.creatServicesService)({
        ...safedata.data,
        duration: parseInt(safedata.data.duration),
        price: parseInt(safedata.data.price),
        images: {
            create: imagem.map(url => ({ url })),
        }
    });
    if (!newServico) {
        return res.status(500).json({ error: "Erro ao criar serviço" });
    }
    await (0, notification_service_1.RegisterActividade)(`o serviço ${newServico.nome} foi criado`, req.userId, newServico.id);
    return res.status(201).json({
        message: "Serviço criado com sucesso",
        servico: newServico
    });
}
async function commentServico(req, res) {
    const userId = req.userId;
    const { id } = req.params;
    const safedata = comment_1.commentSchema.safeParse(req.body);
    if (!safedata.success) {
        return res.status(400).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    const user = await (0, user_service_1.FindUserById)(userId);
    if (!user) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }
    const comment = await (0, comments_service_1.createComments)(id, userId, safedata.data.commentText);
    if (!comment) {
        return res.status(403).json({ error: "Erro ao criar comentario" });
    }
    await (0, notification_service_1.RegisterActividade)(`o cliete ${user.nome} comentou no serviço ${service.nome}`, userId, service.id);
    return res.status(201).json({
        message: "comentario criado com sucesso",
        comment
    });
}
async function getServiceById(req, res) {
    const { id } = req.params;
    if (!id.trim()) {
        return res.status(400).json({ error: "ID do serviço é obrigatório" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(403).json({ error: "Serviço não encontrado" });
    }
    return res.status(200).json({ service });
}
async function getAllServices(req, res) {
    const services = await (0, servicos_service_1.findAllServices)();
    return res.status(200).json({ services });
}
async function updateServiceById(req, res) {
    const { id } = req.params;
    const safedata = servicosSchemas_1.servicosSchema.partial().safeParse(req.body);
    if (!safedata.success) {
        return res.status(400).json({
            error: safedata.error.flatten().fieldErrors
        });
    }
    if (!req.userId || (req.role !== 'ADMIN' && req.role !== 'PROFESSIONAL')) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(403).json({ message: 'serviço não existe' });
    }
    const updatedService = await (0, servicos_service_1.updateServiceByIdservice)(id, {
        ...safedata.data,
        duration: parseInt(safedata.data?.duration ? safedata.data?.duration : service.duration.toLocaleString()),
        price: parseInt(safedata.data?.price ? safedata.data?.price : service.price.toLocaleString()),
    });
    if (!updatedService) {
        return res.status(500).json({ error: "Erro ao atualizar serviço" });
    }
    return res.status(200).json({ message: "Serviço atualizado com sucesso", service: updatedService });
}
async function deleteServiceById(req, res) {
    const { id } = req.params;
    if (!req.userId || (req.role !== 'ADMIN' && req.role !== 'PROFESSIONAL')) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(403).json({ error: "serviço não encontrado" });
    }
    const deletedService = await (0, servicos_service_1.deleteServiceByIdservice)(id);
    if (!deletedService) {
        return res.status(403).json({ error: "Erro ao deletar serviço" });
    }
    return res.status(200).json({ message: "Serviço deletado com sucesso", service: deletedService });
}
async function getOtherServicesById(req, res) {
    const { id } = req.params;
    const safeData = parpage_1.paginationSchemas.safeParse(req.query);
    if (!safeData.success) {
        res.json({
            error: safeData.error.flatten().fieldErrors,
        });
        return;
    }
    if (!id.trim()) {
        return res.status(403).json({ error: "ID do serviço é obrigatório" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(403).json({ error: "Serviço não encontrado" });
    }
    let perPage = safeData.data.perPage ?? 10;
    let currentPage = safeData.data.page ?? 0;
    const services = await (0, servicos_service_1.getOtherServiceNotId)(id, currentPage, perPage);
    return res.status(200).json({ services });
}
async function getAllServicesWithPagination(req, res) {
    const safeData = parpage_1.paginationSchemas.safeParse(req.query);
    if (!safeData.success) {
        res.json({
            error: safeData.error.flatten().fieldErrors,
        });
        return;
    }
    let perPage = safeData.data.perPage ?? 10;
    let currentPage = safeData.data.page ?? 0;
    const services = await (0, servicos_service_1.getServicesWithPagination)(currentPage, perPage);
    return res.status(200).json({ services, page: currentPage });
}
const ToogleMarkService = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const service = await (0, servicos_service_1.findServiceById)(id);
    if (!service) {
        return res.status(403).json({ error: "Serviço não encontrado" });
    }
    const isMarked = await (0, bookMark_service_1.FindMark)(userId, id);
    if (isMarked) {
        await (0, bookMark_service_1.unMark)(userId, id);
        await (0, notification_service_1.RegisterActividade)(`uma marcação foi removida `, userId, service.id);
        return res.status(200).json({ message: "Serviço desmarcado", isMarked: false });
    }
    await (0, bookMark_service_1.mark)(userId, id);
    await (0, notification_service_1.RegisterActividade)(`uma marcação foi adicionada `, userId, service.id);
    return res.status(200).json({ message: "Serviço marcado", isMarked: true });
};
exports.ToogleMarkService = ToogleMarkService;
const checkMark = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({ error: "Acesso negado" });
    }
    const isMarked = await (0, bookMark_service_1.FindMark)(userId, id);
    if (isMarked) {
        return res.status(200).json(true);
    }
    else {
        return res.status(200).json(false);
    }
};
exports.checkMark = checkMark;
