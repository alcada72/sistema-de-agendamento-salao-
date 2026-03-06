"use client";
import { AwaitingModal } from "@/components/ui/awaitingModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SigninAdmin } from "@/services/admin/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SigninFormAdmin = () => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [isLoandig, setisLoandig] = useState(false);
  const [message, setmessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setisLoandig(true);
    const result = await SigninAdmin(emailField, passwordField);

    if (!result) {
      return setmessage("E-mail ou senha incorreta");
    }
    {
      setmessage("Usuario logado com sucesso");
      setisLoandig(false);
      return router.replace("/admin");
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
