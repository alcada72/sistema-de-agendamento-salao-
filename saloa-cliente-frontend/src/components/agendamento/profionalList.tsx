"use client";
import { GetProfissionaisLimited } from "@/services/servico.service";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { HardFuncionarioCard } from "../ui/card-funcionario-hard";

interface Props {
  date?: Date;
  onSelect: (id: string) => void;
}

export function ProfissionaList({ onSelect }: Props) {
  const [select, setSelect] = useState<string>();
  const [service, setservice] = useState<User[]>([]);

  useEffect(() => {
    const getService = async () => {
      const p = await GetProfissionaisLimited();
      if (!p) {
        return;
      }
      setservice(p);
    };

    return () => {
      getService();
    };
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
        {service.map((p) => (
          <div
            key={p.id}
            className={`p-0 m-0 ${
              select === p.id && "border-2 border-blue-500"
            } rounded-lg w-full
      flex-1 min-w-[193px] md:min-w-[180px] max-w-1/2 md:max-w-1/3 overflow-hidden`}
            onClick={() => {
              setSelect(p.id);
              onSelect(p.id);
            }}
          >
            <HardFuncionarioCard funcion={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
