import fs from "fs";
import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination(req, file, callback) {

    const baseDir = "../../../uploads";
    let subFolder = "";
    const ext = path.extname(file.originalname).toLowerCase();
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
    } else if (documentos.includes(ext)) {
      subFolder = "Docs";
    } else if (videos.includes(ext)) {
      subFolder = "Videos";
    } else if (audios.includes(ext)) {
      subFolder = "Audios";
    } else {
      subFolder = "Outros";
    }

    const uploadDir = path.join(__dirname, baseDir, subFolder);
    fs.mkdirSync(uploadDir, { recursive: true });
    req.body.uploadDir = uploadDir;
    callback(null, uploadDir);
  },


  filename(req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const nameWithoutExt = path.basename(file.originalname, ext);

    // Função para normalizar o nome: minúsculas, remover acentos, espaços e caracteres especiais
    const safeName = nameWithoutExt
      .normalize("NFC")                // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, "-")            // espaços viram hífen
      .replace(/[^a-zA-Z0-9\-]/g, "")  // remove caracteres inválidos
      .toLowerCase();

    const filename = `${timestamp}-${safeName}${ext}`;
    callback(null, filename);
  }

});
