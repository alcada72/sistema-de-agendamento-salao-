"use client";

import { SignUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const EditPassForm = () => {
  const [actualPassField, setActualPassField] = useState("");
  const [telefoneField, setTelefoneField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const result = await SignUpService(
      actualPassField,
      emailField,
      telefoneField,
      passwordField
    );
    if (result) {
      router.replace("/personalizar/avatar");
    }
  };
  return (
    <div className="flex flex-col gap-5 md:gap-4">
      <Input
        value={actualPassField}
        onChange={(texto) => setActualPassField(texto)}
        placeholder={"Digite a sua senha atual"}
        password
      />

      <Input
        value={passwordField}
        onChange={(texto) => setPasswordField(texto)}
        placeholder={"Digite a nova senha"}
        password
      />
      <Button label={"Alterar a senha"} size={1} onClick={handleSubmit} />
    </div>
  );
};
