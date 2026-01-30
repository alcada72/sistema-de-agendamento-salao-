import path from "path";

export const getPublicURL = (url?: string) => {
  if (!url) return "/default.jpg"; // imagem padrão se vazio
  try {
    new URL(url);
    return url;
  } catch {
    const cleanUrl = url.replace(/^\//, ""); return `${process.env.BASE_URL}/${cleanUrl}`;
  }
};

export const getPublicImageURL = (imagePath: string) => {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${imagePath}`;
};

export const getPublicFormattedUrl = (filePath: string): string => {
  if (!filePath) return "";
  // Normaliza o separador (\ → /) e identifica subpasta (Images, Docs, etc.)
  const normalizedPath = filePath.replace(/\\/g, "/");
  const subFolder = path.basename(path.dirname(normalizedPath));
  const filename = path.basename(normalizedPath);
  // Cria URL pública final
  return `/uploads/${subFolder}/${filename}`;
};