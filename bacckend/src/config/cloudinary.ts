import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const tweetsImg = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "tweets",
    resource_type: "image",
    public_id: Date.now().toString() + "-" + file.originalname.split(".")[0],
  }),
});
export const perfilImg = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "perfil",
    resource_type: "image",
    public_id: Date.now().toString() + "-" + file.originalname.split(".")[0],
  }),
});

