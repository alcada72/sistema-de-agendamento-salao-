"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perfil = exports.tweets = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("../config/cloudinary");
exports.tweets = (0, multer_1.default)({ storage: cloudinary_1.tweetsImg });
exports.perfil = (0, multer_1.default)({ storage: cloudinary_1.perfilImg });
