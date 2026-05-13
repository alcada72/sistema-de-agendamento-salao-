"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicFormattedUrl = exports.getPublicImageURL = exports.getPublicURL = void 0;
const path_1 = __importDefault(require("path"));
const getPublicURL = (url) => {
    if (!url)
        return "/default.jpg"; // imagem padrão se vazio
    try {
        new URL(url);
        return url;
    }
    catch {
        const cleanUrl = url.replace(/^\//, "");
        return `${process.env.BASE_URL}/${cleanUrl}`;
    }
};
exports.getPublicURL = getPublicURL;
const getPublicImageURL = (imagePath) => {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${imagePath}`;
};
exports.getPublicImageURL = getPublicImageURL;
const getPublicFormattedUrl = (filePath) => {
    if (!filePath)
        return "";
    // Normaliza o separador (\ → /) e identifica subpasta (Images, Docs, etc.)
    const normalizedPath = filePath.replace(/\\/g, "/");
    const subFolder = path_1.default.basename(path_1.default.dirname(normalizedPath));
    const filename = path_1.default.basename(normalizedPath);
    // Cria URL pública final
    return `/uploads/${subFolder}/${filename}`;
};
exports.getPublicFormattedUrl = getPublicFormattedUrl;
