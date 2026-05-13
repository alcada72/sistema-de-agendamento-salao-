"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const createJWT = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.createJWT = createJWT;
const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ error: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await (0, user_service_1.FindUserById)(decoded.id);
        if (!user) {
            return res.status(403).json({ error: "Acesso Negado" });
        }
        req.userId = user.id;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
};
exports.verifyJWT = verifyJWT;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ error: "Não autenticado" });
        }
        if (!roles.includes(req.role)) {
            return res.status(403).json({ error: "Acesso negado" });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
