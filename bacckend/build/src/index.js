"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const main_routes_1 = require("./router/main.routes");
const requestInterceptor_1 = require("./utils/requestInterceptor");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization",]
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// Servir uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads"), {
    setHeaders: (res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
}));
app.use(requestInterceptor_1.requestInterceptor);
//Configuração de rotas
app.use(main_routes_1.mainRouter);
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
httpServer.listen(PORT, () => {
    console.log(` 
  ╔════════════════════════════════════════╗
  ║    JMC-cachiungo -  v1.0.0             ║
  ║  JMC-CACHIUNGO agendamento de serviços ║
  ╠════════════════════════════════════════╣
  ║  🚀 Servidor rodando na porta ${PORT}  ║
  ║  🌐 URL Base: ${BASE_URL}             ║  
  ║  📦 Ambiente: ${process.env.NODE_ENV || 'development'}║
  ╚════════════════════════════════════════╝
  `);
});
