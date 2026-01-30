"use client";

import { SignUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SignupForm = () => {
  const [nomeField, setNomeField] = useState("");
  const [telefoneField, setTelefoneField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const result = await SignUpService(
      nomeField,
      emailField,
      telefoneField,
      passwordField
    );
    if (result) {
      router.replace("/personalizar/avatar");
    }
  };
  return (
    <div className="flex flex-col gap-3 md:gap-4">
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
      <Input
        value={passwordField}
        onChange={(texto) => setPasswordField(texto)}
        placeholder={"Digite sua Senha"}
        password
      />
      <Button label={"Criar Conta"} size={1} uppercase onClick={handleSubmit} />
    </div>
  );
};
