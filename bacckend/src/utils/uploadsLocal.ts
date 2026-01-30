import multer from "multer";
import { storage } from "../config/uploadLocal";

export const upload = multer({ storage });
