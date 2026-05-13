"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const agendaController = __importStar(require("../controllers/agenda.controller"));
const authController = __importStar(require("../controllers/auth.controller"));
const clientController = __importStar(require("../controllers/client.controller"));
const emailController = __importStar(require("../controllers/email.controller"));
const pingController = __importStar(require("../controllers/ping.controller"));
const professionalController = __importStar(require("../controllers/profissional.controller"));
const servicesController = __importStar(require("../controllers/servicos.controller"));
const usersController = __importStar(require("../controllers/users.controller"));
const jwt_1 = require("../utils/jwt");
const uploadsLocal_1 = require("../utils/uploadsLocal");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.get("/ping", pingController.ping);
exports.mainRouter.get("/pingPrivate", jwt_1.verifyJWT, pingController.pingPrivate);
exports.mainRouter.post("/verify/email", emailController.verifacationEmail);
exports.mainRouter.post("/verify/email/reenviar", jwt_1.verifyJWT, emailController.reeSendEmail);
//rotas de autenticação
exports.mainRouter.post('/auth/signup/admin', authController.signupUserAdmin);
exports.mainRouter.post('/auth/signup/prof', jwt_1.verifyJWT, uploadsLocal_1.upload.single("image"), (0, jwt_1.authorizeRoles)("ADMIN"), authController.signupUserProfisional);
exports.mainRouter.post('/auth/signup/client', authController.signupUserClient);
exports.mainRouter.post('/auth/signin', authController.SigninUser);
//rotas de usuário
exports.mainRouter.get('/users/me', jwt_1.verifyJWT, usersController.getMe);
exports.mainRouter.put('/users/me', jwt_1.verifyJWT, usersController.updateMe);
exports.mainRouter.delete('/users/me', jwt_1.verifyJWT, usersController.deleteMe);
exports.mainRouter.post('/users/image', jwt_1.verifyJWT, uploadsLocal_1.upload.single("image"), usersController.postImagem);
exports.mainRouter.put('/users/avatar', jwt_1.verifyJWT, uploadsLocal_1.upload.single("image"), usersController.upDateAvater);
exports.mainRouter.put('/users/password', jwt_1.verifyJWT, usersController.updateMyPassword);
exports.mainRouter.get('/users/:id', jwt_1.verifyJWT, usersController.getUserById);
exports.mainRouter.get('/users', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN"), usersController.getAllUsers);
exports.mainRouter.delete('/users/:id', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN"), usersController.deleteUserById);
exports.mainRouter.put('/users/:id', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN"), usersController.updateUserById);
exports.mainRouter.get('/user/notify', jwt_1.verifyJWT, usersController.getNotifcationsByUser);
exports.mainRouter.get('/user/bookmarks', jwt_1.verifyJWT, usersController.getMarksByUser);
//rotas de serviços
exports.mainRouter.post('/services', uploadsLocal_1.upload.array('image', 5), jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN", "PROFESSIONAL"), servicesController.creatServicos);
exports.mainRouter.get('/services/:id', servicesController.getServiceById);
exports.mainRouter.get('/services', servicesController.getAllServices);
exports.mainRouter.put('/services/:id', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN", "PROFESSIONAL"), servicesController.updateServiceById);
exports.mainRouter.post('/services/:id/comment', jwt_1.verifyJWT, servicesController.commentServico);
exports.mainRouter.delete('/services/:id', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN", "PROFESSIONAL"), servicesController.deleteServiceById);
exports.mainRouter.get("/service/pagination", jwt_1.verifyJWT, servicesController.getAllServicesWithPagination);
exports.mainRouter.get('/services/other/:id', servicesController.getOtherServicesById);
exports.mainRouter.post('/services/:id/bookmark', jwt_1.verifyJWT, servicesController.ToogleMarkService);
exports.mainRouter.get('/services/:id/bookmark/check', jwt_1.verifyJWT, servicesController.checkMark);
//rotas de agendamentos
exports.mainRouter.post('/appointments', jwt_1.verifyJWT, agendaController.createAppointment);
exports.mainRouter.get('/appointments/:id', jwt_1.verifyJWT, agendaController.getAppointmentById);
exports.mainRouter.get('/appointments', agendaController.getAllAppointments);
exports.mainRouter.put('/appointments/:id', jwt_1.verifyJWT, agendaController.updateAppointmentById);
exports.mainRouter.put('/appointments/status/:id', jwt_1.verifyJWT, agendaController.comfirmAppointmentById);
exports.mainRouter.delete('/appointments/:id', jwt_1.verifyJWT, agendaController.deleteAppointmentById);
//rotas de profissionais
exports.mainRouter.get('/professionals/appointments/:id', jwt_1.verifyJWT, (0, jwt_1.authorizeRoles)("ADMIN", "PROFESSIONAL"), professionalController.GetAllAgendaByProfissional);
//mainRouter.get('/professionals/:id', professionalController.getProfessionalById)
exports.mainRouter.get('/professionals', professionalController.getAllProfessionals);
//mainRouter.put('/professionals/:id', verifyJWT, authorizeRoles("ADMIN"), professionalController.updateProfessionalById)
//mainRouter.delete('/professionals/:id', verifyJWT, authorizeRoles("ADMIN"), professionalController.deleteProfessionalById)
//rotas de clientes
//mainRouter.post('/clients', verifyJWT, authorizeRoles("ADMIN"), clientController.createClient)
exports.mainRouter.get('/clients/:id', clientController.getClientById);
exports.mainRouter.get('/clients', clientController.getAllClients);
//mainRouter.put('/clients/:id', verifyJWT, authorizeRoles("ADMIN"), clientController.updateClientById)
//mainRouter.delete('/clients/:id', verifyJWT, authorizeRoles("ADMIN"), clientController.deleteClientById)
exports.mainRouter.get('/clients/appointments/:id', jwt_1.verifyJWT, clientController.getAppointmentsByUserId);
//rotas de horários
//mainRouter.post('/schedules', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), scheduleController.createSchedule)
//mainRouter.get('/schedules/:id', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), scheduleController.getScheduleById)
//mainRouter.get('/schedules', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), scheduleController.getAllSchedules)
//mainRouter.put('/schedules/:id', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), scheduleController.updateScheduleById)
//mainRouter.delete('/schedules/:id', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), scheduleController.deleteScheduleById)
//rotas de categorias
//mainRouter.post('/categories', verifyJWT, authorizeRoles("ADMIN"), categoryController.createCategory)
//mainRouter.get('/categories/:id', categoryController.getCategoryById)
//mainRouter.get('/categories', categoryController.getAllCategories)
//mainRouter.put('/categories/:id', verifyJWT, authorizeRoles("ADMIN"), categoryController.updateCategoryById)
//mainRouter.delete('/categories/:id', verifyJWT, authorizeRoles("ADMIN"), categoryController.deleteCategoryById)
//rotas de avaliações
//mainRouter.post('/reviews', verifyJWT, reviewController.createReview)
//mainRouter.get('/reviews/:id', reviewController.getReviewById)
//mainRouter.get('/reviews', reviewController.getAllReviews)
//mainRouter.put('/reviews/:id', verifyJWT, reviewController.updateReviewById)
//mainRouter.delete('/reviews/:id', verifyJWT, reviewController.deleteReviewById)
//rotas de pagamentos
//mainRouter.post('/payments', verifyJWT, paymentController.createPayment)
//mainRouter.get('/payments/:id', verifyJWT, paymentController.getPaymentById)
//mainRouter.get('/payments', verifyJWT, paymentController.getAllPayments)
//mainRouter.put('/payments/:id', verifyJWT, paymentController.updatePaymentById)
//mainRouter.delete('/payments/:id', verifyJWT, paymentController.deletePaymentById)
