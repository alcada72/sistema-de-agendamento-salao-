"use client";

import { SigninService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AwaitingModal } from "../ui/awaitingModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SigninForm = () => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage("");

    if (!emailField || !passwordField) {
      setMessage("Preencha todos os campos");
      setIsLoading(false);
      return;
    }
    const result = await SigninService(emailField, passwordField);

    if (!result) {
      setMessage("E-mail ou senha incorreta");
      setIsLoading(false);
      return alert("E-mail ou senha incorreta");
    }

    setMessage("Logado com sucesso");
    setIsLoading(false);

    if (result.role === "ADMIN") {
      return router.replace("/admin");
    } else if (result.role === "PROFESSIONAL") {
      return router.replace("/prof");
    } else {
      return router.replace("/");
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
      <Button
        label={"Entrar"}
        disabled={isLoading}
        size={1}
        onClick={handleSubmit}
        uppercase
      />

      {isLoading && (
        <AwaitingModal
          closeAction={() => setIsLoading(false)}
          mostraractions={!!message}
          message={message || "Processando..."}
        />
      )}
    </div>
  );
};
