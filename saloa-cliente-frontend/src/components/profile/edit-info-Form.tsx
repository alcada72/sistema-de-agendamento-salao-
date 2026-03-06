"use client";

import { UpdateImage } from "@/services/auth.service";
import { UpdateUserByIdService } from "@/services/user.service";
import { User } from "@/types/user";
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
  const [isLoandig, setisLoading] = useState(false);

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
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    if (avatar) {
      fd.append("image", avatar);
    }
    
    try {
      setisLoading(true);
      const result = await UpdateUserByIdService({
        nome: nomeField,
        email: emailField,
        telefone: telefoneField,
      });

      const resimault = await UpdateImage(fd);
      if (result && resimault) {
        alert("Atualizado com sucesso!");
        return router.replace("/profile");
      } else {
        return alert("Erro ao atualizar!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
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
          onChange={(texto) => setNomeField(texto)}
          placeholder={"Digite o seu Nome"}
        />
        <Input
          value={emailField}
          onChange={(texto) => setEmailField(texto)}
          placeholder={"digite o seu E-mail"}
        />
        <Input
          value={telefoneField}
          onChange={(texto) => setTelefoneField(texto)}
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
