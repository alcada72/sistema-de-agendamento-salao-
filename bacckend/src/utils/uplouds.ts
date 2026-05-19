import multer from "multer";
import { perfilImg, tweetsImg } from "../config/cloudinary";

export const tweets = multer({
  storage: tweetsImg,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const perfil = multer({
  storage: perfilImg,
  limits: { fileSize: 1 * 1024 * 1024 },
});
