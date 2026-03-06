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
  const [isLoandig, setisLoandig] = useState(false);
  const [message, setmessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setisLoandig(true);
    const result = await SignUpService(
      nomeField,
      emailField,
      telefoneField,
      passwordField,
    );
    if (result) {
      setmessage("Usuario criado com sucesso");
      setisLoandig(false);
      router.replace("/verification");
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
      <Button
        label={"Criar Conta"}
        disabled={isLoandig}
        size={1}
        uppercase
        onClick={handleSubmit}
      />

      {isLoandig && (
        <AwaitingModal
          closeAction={() => setisLoandig(false)}
          mostraractions={!message ? false : true}
          message={!message ? "Processando..." : message}
        />
      )}
    </div>
  );
};
