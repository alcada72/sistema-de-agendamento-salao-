"use client";
import { GetProfessionalsCategoria } from "@/services/servico.service";
import { Category } from "@/types/servicos";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { HardFuncionarioCard } from "../ui/card-funcionario-hard";
import { ActiveProgressIndicator } from "../ui/spin";

interface Props {
  date?: Date;
  category: Category;
  onSelect: (id: string) => void;
}

export function ProfissionaList({ onSelect, category }: Props) {
  const [select, setSelect] = useState<string>();
  const [service, setservice] = useState<User[]>([]);

  const [isLoading, setisLoading] = useState(true);

  const getService = async () => {
    setisLoading(true);
    const p = await GetProfessionalsCategoria(category);
    console.log("Professionals disponivel", p);

    if (p) {
      setservice(p);
    }
    setisLoading(false);
  };

  useEffect(() => {
    getService();
  }, []);

  if (!service) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Escolha o seu Barbeiro</h2>
      <div
        className="flex w-full items-center gap-3
    overflow-y-hidden overflow-x-auto px-4 hide-scroobar"
      >
        {!isLoading &&
          service.map((p) => (
            <div
              key={p.id}
              className={`p-0 m-0 ${
                select === p.id && "border-2 border-blue-500"
              } rounded-lg w-full relative flex-1 min-w-48.25
              md:min-w-45 max-w-1/2 md:max-w-1/3 overflow-hidden`}
              onClick={() => {
                setSelect(p.id);
                onSelect(p.id);
              }}
            >
              <HardFuncionarioCard user={p} />
              <div className="absolute inset-0 size-full bg-transparent cursor-pointer"></div>
            </div>
          ))}

        {isLoading && (
          <div
            className={`size-full flex flex-col items-center justify-center `}
          >
            <span className="text-lg font-medium mb-0" > Carregando </span>
            <ActiveProgressIndicator />
          </div>
        )}
      </div>
    </div>
  );
}
