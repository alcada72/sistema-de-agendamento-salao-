"use client";

import { SignUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AwaitingModal } from "../ui/awaitingModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SignupForm = () => {
  const [nomeField, setNomeField] = useState("");
  const [telefoneField, setTelefoneField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setmessage] = useState<string | null>("");
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setmessage(null);

    if (!nomeField || !emailField || !telefoneField || !passwordField) {
      setmessage("Preencha todos os campos");
      setIsLoading(false);
      return;
    }

    const result = await SignUpService(
      nomeField,
      emailField,
      telefoneField,
      passwordField,
    );

    if (!result) {
      setmessage("Erro ao criar usuario");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    return router.replace("/");
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4">
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
      <Input
        value={passwordField}
        onChangeText={(texto) => setPasswordField(texto)}
        placeholder={"Digite sua Senha"}
        password
      />
      <Button
        label={"Criar Conta"}
        disabled={isLoading}
        size={1}
        uppercase
        onClick={handleSubmit}
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
