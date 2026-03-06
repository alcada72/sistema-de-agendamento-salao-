import { Router } from "express"
import * as agendaController from "../controllers/agenda.controller"
import * as authController from "../controllers/auth.controller"
import * as clientController from "../controllers/client.controller"
import * as emailController from "../controllers/email.controller"
import * as pingController from "../controllers/ping.controller"
import * as professionalController from "../controllers/profissional.controller"
import * as servicesController from "../controllers/servicos.controller"
import * as usersController from "../controllers/users.controller"
import { authorizeRoles, verifyJWT } from "../utils/jwt"
import { upload } from "../utils/uploadsLocal"

export const mainRouter = Router()

mainRouter.get("/ping", pingController.ping)
mainRouter.get("/pingPrivate", verifyJWT, pingController.pingPrivate)

mainRouter.post("/verify/email", emailController.verifacationEmail);
mainRouter.post(
  "/verify/email/reenviar",
  verifyJWT,
  emailController.reeSendEmail
);

//rotas de autenticação
mainRouter.post('/auth/signup/admin', authController.signupUserAdmin)
mainRouter.post('/auth/signup/prof', verifyJWT, upload.single("image"), authorizeRoles("ADMIN"), authController.signupUserProfisional)
mainRouter.post('/auth/signup/client', authController.signupUserClient)
mainRouter.post('/auth/signin', authController.SigninUser)

//rotas de usuário
mainRouter.get('/users/me', verifyJWT, usersController.getMe)
mainRouter.put('/users/me', verifyJWT, usersController.updateMe)
mainRouter.delete('/users/me', verifyJWT, usersController.deleteMe)
mainRouter.post('/users/image', verifyJWT, upload.single("image"), usersController.postImagem)
mainRouter.put('/users/avatar', verifyJWT, upload.single("image"), usersController.upDateAvater)
mainRouter.put('/users/password', verifyJWT, usersController.updateMyPassword)
mainRouter.get('/users/:id', verifyJWT, usersController.getUserById)
mainRouter.get('/users', verifyJWT, authorizeRoles("ADMIN"), usersController.getAllUsers)
mainRouter.delete('/users/:id', verifyJWT, authorizeRoles("ADMIN"), usersController.deleteUserById)
mainRouter.put('/users/:id', verifyJWT, authorizeRoles("ADMIN"), usersController.updateUserById)
mainRouter.get('/user/notify', verifyJWT, usersController.getNotifcationsByUser)
mainRouter.get('/user/bookmarks', verifyJWT, usersController.getMarksByUser)

//rotas de serviços
mainRouter.post('/services', upload.array('image', 5), verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), servicesController.creatServicos)
mainRouter.get('/services/:id', servicesController.getServiceById)
mainRouter.get('/services', servicesController.getAllServices)
mainRouter.put('/services/:id', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), servicesController.updateServiceById)
mainRouter.post('/services/:id/comment', verifyJWT, servicesController.commentServico)
mainRouter.delete('/services/:id', verifyJWT, authorizeRoles("ADMIN", "PROFESSIONAL"), servicesController.deleteServiceById)
mainRouter.get("/service/pagination", verifyJWT, servicesController.getAllServicesWithPagination)
mainRouter.get('/services/other/:id', servicesController.getOtherServicesById)
mainRouter.post('/services/:id/bookmark', verifyJWT, servicesController.ToogleMarkService)
mainRouter.get('/services/:id/bookmark/check', verifyJWT, servicesController.checkMark)

//rotas de agendamentos
mainRouter.post('/appointments', verifyJWT, agendaController.createAppointment)
mainRouter.get('/appointments/:id', verifyJWT, agendaController.getAppointmentById)
mainRouter.get('/appointments', agendaController.getAllAppointments)
mainRouter.put('/appointments/:id', verifyJWT, agendaController.updateAppointmentById)
mainRouter.put('/appointments/status/:id', verifyJWT, agendaController.comfirmAppointmentById)
mainRouter.delete('/appointments/:id', verifyJWT, agendaController.deleteAppointmentById)

//rotas de profissionais
//mainRouter.post('/professionals', verifyJWT, authorizeRoles("ADMIN"), professionalController.createProfessional)
//mainRouter.get('/professionals/:id', professionalController.getProfessionalById)
mainRouter.get('/professionals', professionalController.getAllProfessionals)
//mainRouter.put('/professionals/:id', verifyJWT, authorizeRoles("ADMIN"), professionalController.updateProfessionalById)
//mainRouter.delete('/professionals/:id', verifyJWT, authorizeRoles("ADMIN"), professionalController.deleteProfessionalById)

//rotas de clientes
//mainRouter.post('/clients', verifyJWT, authorizeRoles("ADMIN"), clientController.createClient)
mainRouter.get('/clients/:id', clientController.getClientById)
mainRouter.get('/clients', clientController.getAllClients)
//mainRouter.put('/clients/:id', verifyJWT, authorizeRoles("ADMIN"), clientController.updateClientById)
//mainRouter.delete('/clients/:id', verifyJWT, authorizeRoles("ADMIN"), clientController.deleteClientById)
mainRouter.get('/clients/appointments/:id', verifyJWT, clientController.getAppointmentsByUserId)

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
