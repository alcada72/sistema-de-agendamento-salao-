"use client";
import { AgendamentoCard } from "@/components/agendamento/agendamentoCard";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";
import {
  CancelAgendamentoById,
  DeleteAgendamentoById,
  GetAllAgendaentos,
} from "@/services/servico.service";
import { agenda } from "@/types/servicos";
import { formatRelativeTime } from "@/utils/format-ralative";
import { useEffect, useState } from "react";

export default function Page() {
  const [agenda, setAgenda] = useState<agenda[]>([]);

  const handleGetallAgendas = async () => {
    try {
      const res = await GetAllAgendaentos();
      if (!res) {
        return;
      }
      setAgenda(res);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetallAgendas();
    return () => {
      handleGetallAgendas();
    };
  }, []);

  if (!agenda) {
    return null;
  }

  const handleCancelAgendamento = async (id: string) => {
    if (confirm("Deseja mesmo cancelar este item da agenda")) {
      const deleted = await CancelAgendamentoById(id, "CANCELLED");

      if (deleted) {
        console.log("cancelado");
        handleGetallAgendas();
      } else {
        console.log("não cancelado");
      }
    }
  };
  const handleDeleteAgendamento = async (id: string) => {
    if (confirm("Deseja mesmo eliminar este item da agenda")) {
      const deleted = await DeleteAgendamentoById(id);

      if (deleted) {
        console.log("Eliminado");
        handleGetallAgendas();
      } else {
        console.log("não Eliminado");
      }
    }
  };

  return (
    <div>
      <GeneralHeader>
        <div className="flex justify-between items-center gap-4">
          <div className="flex w-full flex-1 ">
            <section>
              <h1 className="text-3xl font-bold">Minha agenda</h1>
            </section>
          </div>
          <SwitchTheme hideLabel />
        </div>
      </GeneralHeader>
      <div className="mt-[60px] md:mt-0">
        <div className="p-3 pt-6 gap-4 flex flex-col">
          {agenda.map((a) => (
            <AgendamentoCard
              key={a.id}
              service={a.service.nome}
              status={a.status}
              url={a.service.images[0 as number]?.url as string}
              date={formatRelativeTime(a.date)}
              time={a.date
                .toString()
                .split("T")[1]
                .replace(":00.000Z", " Horas")}
              onCancel={() => handleCancelAgendamento(a.id)}
              onDelete={() => handleDeleteAgendamento(a.id)}
              showOptios
            />
          ))}
        </div>
      </div>
    </div>
  );
}
