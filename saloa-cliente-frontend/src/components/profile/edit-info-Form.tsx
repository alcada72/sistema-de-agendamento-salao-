"use client";

import api from "@/api/api";
import { User } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Avatar } from "../comments/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  user: User;
};

export const EditIfonForm = ({ user }: Props) => {
  const fileInputAvatarRef = useRef<HTMLInputElement>(null);
  const [isLoandig, setIsLoandig] = useState(false);

  const [nomeField, setNomeField] = useState(user.nome);
  const [telefoneField, setTelefoneField] = useState(user.telefone);
  const [emailField, setEmailField] = useState(user.email);
  const [preview, setPreview] = useState<string>(user.image);
  const [avatar, setAvatar] = useState<File | null>(null);

  const router = useRouter();

  const handleClickCameraAvatar = () => fileInputAvatarRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    const views = URL.createObjectURL(file);
    setPreview(views);

    return () => URL.revokeObjectURL(views);
  };

  const handleSubmit = async () => {
    if (isLoandig) return;
    const fd = new FormData();

    fd.append("nome", nomeField);
    fd.append("email", emailField);
    fd.append("telefone", telefoneField);

    if (avatar) {
      fd.append("image", avatar);
    }

    for (const pair of fd.entries()) {
      console.log(pair);
    }

    try {
      setIsLoandig(true);

      await api.putForm("/users/me", fd);

      router.refresh();
      alert("Atualizado com sucesso!");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.error);
        alert(error.response?.data?.error);
      }
    } finally {
      setIsLoandig(false);
    }
  };

  const handleRemoveAvatar = () => {
    setPreview(user.image);
    setAvatar(null);
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex flex-col items-center gap-1.5 relative">
        <div className="relative overflow-hidden rounded-full">
          <Avatar src={preview} size={1} />
          {avatar && (
            <button
              onClick={handleRemoveAvatar}
              className="outline-o text-red-500 bg-gray-500/50 w-full text-2xl  absolute bottom-0
             right-0 m-auto hover:opacity-100 transition-opacity"
            >
              x
            </button>
          )}
        </div>

        <button
          onClick={handleClickCameraAvatar}
          className="outline-o text-blue-500 z-30"
        >
          Alterar foto
        </button>
      </div>

      <div className="flex flex-col gap-5 md:gap-4 w-full">
        <Input
          value={nomeField}
          onChangeText={(texto) => setNomeField(texto)}
          placeholder={"Digite o seu Nome"}
        />
        <Input
          value={emailField}
          onChangeText={(texto) => setEmailField(texto)}
          placeholder={"digite o seu E-mail"}
        />
        <Input
          value={telefoneField}
          onChangeText={(texto) => setTelefoneField(texto)}
          placeholder={"Digite seu nº Telefone"}
        />

        <Button
          label={"Salvar Alterações"}
          disabled={isLoandig}
          size={1}
          onClick={handleSubmit}
        />
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
};
