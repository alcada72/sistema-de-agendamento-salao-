"use client";
import api from "@/api/api";
import { Button } from "@/components/ui/button";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page() {
  const fileInputCoverRef = useRef<HTMLInputElement>(null);
  const fileInputAvatarRef = useRef<HTMLInputElement>(null);

  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [formDataCover, setFormDataCover] = useState<FormData | null>(null);
  const [formDataAvatar, setFormDataAvatar] = useState<FormData | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickCameraCover = () => fileInputCoverRef.current?.click();

  const handleClickCameraAvatar = () => fileInputAvatarRef.current?.click();

  const handleFileChangeCover = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewCover(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("cover", file);

    setFormDataCover(fd);
  };

  const handleFileChangeAvatar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewAvatar(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("avatar", file);

    setFormDataAvatar(fd);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const requests = [];

      if (formDataAvatar) {
        requests.push(
          api.put(`/user/avatar`, formDataAvatar, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );
      }

      if (formDataCover) {
        requests.push(
          api.put(`/user/cover`, formDataCover, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );
      }

      await Promise.all(requests);

      alert("Atualizado com sucesso!");
      router.replace("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-500 h-80 relative">
        <img
          src={previewCover ?? "/default.jpg"}
          alt="Imagem do fundo"
          className="size-full object-cover"
        />
        <span
          title="Alterar a imagem de capa"
          onClick={handleClickCameraCover}
          className="absolute bottom-0 right-0 mr-2.5 z-50 rounded-full size-10 flex items-center justify-center p-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faCamera} size="2x" />
        </span>
      </div>

      <div className="-mt-32 flex relative items-center justify-center w-full">
        <div className="relative size-60 rounded-full border-2 border-gray-800 overflow-hidden">
          <img
            src={previewAvatar ?? "/default.jpg"}
            alt="Imagem de perfil"
            className="size-full object-cover rounded-full"
          />

          <span
            onClick={handleClickCameraAvatar}
            className="absolute top-0 left-0 bg-gray-500/40 rounded-full size-full flex items-center justify-center p-2 cursor-pointer hover:bg-gray-500/60"
          >
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto mt-8 px-6 md:px-0">
        <Button
          label={loading ? "Salvando..." : "Salvar alterações"}
          size={1}
          onClick={handleSubmit}
          disabled={!formDataAvatar || !formDataCover || loading}
        />
      </div>

      {/* Inputs escondidos */}
      <input
        type="file"
        ref={fileInputCoverRef}
        onChange={handleFileChangeCover}
        accept="image/*"
        className="hidden"
      />

      <input
        type="file"
        ref={fileInputAvatarRef}
        onChange={handleFileChangeAvatar}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
