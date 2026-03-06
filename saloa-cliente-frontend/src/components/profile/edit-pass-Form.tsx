"use client";

import { SigninService } from "@/services/auth.service";
import { UpadateUserPassword } from "@/services/user.service";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  user: User;
};

export const EditPassForm = ({ user }: Props) => {
  const [actualPassField, setActualPassField] = useState("");

  const [message, setMessageField] = useState("");
  const [atualPassConfirm, setatualPassConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const router = useRouter();

  const handleVerifyPassword = async () => {
    setMessageField("");
    setIsLoading(true);
    const result = await SigninService(user.email, actualPassField);

    if (!result) {
      setMessageField("Senha Incorreta");
      setIsLoading(false);
      return setatualPassConfirm(false);
    } else {
      setMessageField("");
      setIsLoading(false);
      return setatualPassConfirm(true);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!passwordField || !confirmPassword) {
      return setMessageField("Preencha todos os campos");
    }
    if (passwordField !== confirmPassword) {
      return setMessageField("As senhas não coincidem");
    }
    setMessageField("");
    const result = await UpadateUserPassword(passwordField, confirmPassword);
    if (result) {
      setMessageField("Senha alterada com sucesso!");
      router.replace("/profile");
    } else {
      setIsLoading(false);
      setMessageField("Erro ao alterar a senha. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 md:gap-4">
        {message && <div className="text-red-500 text-sm">{message}</div>}
        <Input
          value={passwordField}
          onChange={(texto) => setPasswordField(texto)}
          placeholder={"Digite a sua senha atual"}
          password
        />

        <Input
          value={confirmPassword}
          onChange={(texto) => setConfirmPassword(texto)}
          placeholder={"Confirme a nova senha"}
          password
        />
        <Button
          label={"Alterar a senha"}
          disabled={isLoading}
          size={1}
          onClick={handleSubmit}
        />
      </div>

      {!atualPassConfirm && (
        <div
          className={`
          absolute inset-0 bg-black/40 
          backdrop-blur-[2px] flex flex-col items-center justify-center z-40 size-full overflow-x-auto
      `}
        >
          <div className="flex items-center justify-center h-full flex-col w-full px-1.5">
            <div className="max-w-xl w-full  bg border border-neutral-500/35 rounded-2xl flex flex-col gap-4  p-6">
              <p className=" text-lg font-medium mb-2.5">
                Confirma a sua identidade
              </p>
              {message && <div className="text-red-500 text-sm">{message}</div>}
              <Input
                value={actualPassField}
                onChange={(texto) => setActualPassField(texto)}
                placeholder={"Digite a sua senha actual"}
              />

              <Button
                label={"Confirmar"}
                size={1}
                onClick={handleVerifyPassword}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
