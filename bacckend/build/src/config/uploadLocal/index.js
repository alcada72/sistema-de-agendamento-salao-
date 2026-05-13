"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        const baseDir = "../../../uploads";
        let subFolder = "";
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const imagens = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
        const documentos = [
            ".pdf",
            ".doc",
            ".docx",
            ".txt",
            ".xlsx",
            ".xls",
            ".csv",
        ];
        const videos = [".mp4", ".mov", ".avi", ".mkv"];
        const audios = [".mp3", ".wav", ".ogg", ".m4a"];
        if (imagens.includes(ext)) {
            subFolder = "Images";
        }
        else if (documentos.includes(ext)) {
            subFolder = "Docs";
        }
        else if (videos.includes(ext)) {
            subFolder = "Videos";
        }
        else if (audios.includes(ext)) {
            subFolder = "Audios";
        }
        else {
            subFolder = "Outros";
        }
        const uploadDir = path_1.default.join(__dirname, baseDir, subFolder);
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
        req.body.uploadDir = uploadDir;
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        const timestamp = Date.now();
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const nameWithoutExt = path_1.default.basename(file.originalname, ext);
        // Função para normalizar o nome: minúsculas, remover acentos, espaços e caracteres especiais
        const safeName = nameWithoutExt
            .normalize("NFC") // separa acentos
            .replace(/[\u0300-\u036f]/g, "") // remove acentos
            .replace(/\s+/g, "-") // espaços viram hífen
            .replace(/[^a-zA-Z0-9\-]/g, "") // remove caracteres inválidos
            .toLowerCase();
        const filename = `${timestamp}-${safeName}${ext}`;
        callback(null, filename);
    }
});
