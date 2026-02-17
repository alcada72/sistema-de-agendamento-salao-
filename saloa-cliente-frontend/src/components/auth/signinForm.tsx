"use client";

import { SigninService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SigninForm = () => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const result = await SigninService(emailField, passwordField);
    console.log("Result", result, result);

    if (!result) {
      alert("E-mailou senha incorreta");
    }
    {
      return router.replace("/home");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={emailField}
        onChange={(texto) => setEmailField(texto)}
        placeholder={"Digite seu E-mail ou nº Telefone"}
      />
      <Input
        value={passwordField}
        onChange={(texto) => setPasswordField(texto)}
        placeholder={"Digite sua Senha"}
        password
      />
      <Button label={"Entrar"} size={1} onClick={handleSubmit} uppercase />
    </div>
  );
};
