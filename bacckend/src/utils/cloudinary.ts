import { v2 as cloudinary } from "cloudinary";

/**
 * Deleta uma imagem do Cloudinary a partir de sua URL pública.
 * @param imageUrl URL da imagem armazenada no Cloudinary.
 */
export const deleteImageFromCloudinary = async (imageUrl: string) => {
  try {
    if (!imageUrl || !imageUrl.includes("cloudinary.com")) return;

    // Extrai partes da URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/").filter(Boolean); // Remove strings vazias

    // Verifica se há pastas suficientes (ex: /v1/folder/image.jpg)
    if (pathParts.length < 2) return;

    const fileWithExt = pathParts[pathParts.length - 1]; // "nome.jpg"
    const folder = pathParts[pathParts.length - 2]; // "tweets" ou "perfil"
    const publicId = `${folder}/${fileWithExt.split(".")[0]}`; // "tweets/17526-foto"

    // Tenta deletar a imagem no Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok") {
      console.warn("Cloudinary retornou:", result);
    }
  } catch (error) {
    console.error("Erro ao deletar imagem no Cloudinary:", error);
  }
};
