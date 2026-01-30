import multer from "multer";
import { perfilImg, tweetsImg } from "../config/cloudinary";

export const tweets = multer({ storage: tweetsImg });
export const perfil = multer({ storage: perfilImg });
