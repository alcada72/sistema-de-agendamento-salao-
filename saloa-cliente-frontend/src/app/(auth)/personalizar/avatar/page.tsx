"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { UpdateImage } from "@/services/auth.service";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page() {
  const fileInputAvatarRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClickCameraAvatar = () => fileInputAvatarRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);

    const views = URL.createObjectURL(file);
    setPreview(views);
  };

  const handleSubmit = async () => {
    if (!image) return;
    const fd = new FormData();
    fd.append("image", image);

    try {
      setLoading(true);

      const result = await UpdateImage(fd);
      if (result) {
        alert("Atualizado com sucesso!");
       return router.replace("/home");
      }else{
        return alert("Erro ao atualizar!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-screen">
      <div className="flex flex-col gap-3.5 relative items-center justify-center w-full h-full">
        <div className="flex w-full items-center justify-between mb-3.5 px-7">
          <Logo size={90} />
          <p className="text-2xl font-bold">J.M.C</p>
        </div>
        <div className="relative size-80 rounded-full border-2 border-gray-800 overflow-hidden">
          <img
            src={preview ?? "/default.jpg"}
            alt="Imagem de perfil"
            className="size-full object-cover rounded-full bg-gray-700 text-gray-700"
          />

          <span
            onClick={handleClickCameraAvatar}
            className="absolute top-0 left-0 bg-gray-500/10 rounded-full
             size-full flex items-center justify-center p-2 cursor-pointer hover:bg-gray-500/30"
          >
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </span>
        </div>

        <div className="max-w-lg w-full mx-auto mt-8 px-6 md:px-0">
          <Button
            label={loading ? "Salvando..." : "Salvar alterações"}
            size={1}
            onClick={handleSubmit}
            disabled={!image || loading}
          />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputAvatarRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
