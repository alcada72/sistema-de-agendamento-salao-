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
  const [isLoandig, setisLoandig] = useState(false);
  const [message, setmessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setisLoandig(true);
    const result = await SigninService(emailField, passwordField);
    console.log("Result", result, result);

    if (!result) {
      alert("E-mailou senha incorreta");
    }
    {
      alert("Usuario logado com sucesso");
      setisLoandig(false);
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
      <Button
        label={"Entrar"}
        disabled={isLoandig}
        size={1}
        onClick={handleSubmit}
        uppercase
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
