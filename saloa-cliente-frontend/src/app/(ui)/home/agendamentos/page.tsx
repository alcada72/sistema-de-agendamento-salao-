"use client";

import { useEffect, useState } from "react";

import { AgendamentoCard } from "@/components/agendamento/agendamentoCard";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";

import {
  CancelAgendamentoById,
  DeleteAgendamentoById,
  GetAllAgendaentosByUser,
} from "@/services/servico.service";

import { Agenda } from "@/types/servicos";
import { formatRelativeTime } from "@/utils/format-ralative";

export default function Page() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleGetAllAgendas() {
    try {
      setLoading(true);

      const res = await GetAllAgendaentosByUser();

      if (res) {
        setAgendas(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetAllAgendas();
  }, []);

  async function handleCancelAgendamento(id: string) {
    const confirmar = confirm("Deseja mesmo cancelar este item da agenda?");

    if (!confirmar) return;

    const cancelled = await CancelAgendamentoById(id, "CANCELLED");

    if (cancelled) {
      handleGetAllAgendas();
    }
  }

  async function handleDeleteAgendamento(id: string) {
    const confirmar = confirm("Deseja mesmo eliminar este item da agenda?");

    if (!confirmar) return;

    const deleted = await DeleteAgendamentoById(id);

    if (deleted) {
      handleGetAllAgendas();
    }
  }

  const renderContent = () => {
    if (loading) {
      return <p className="w-full text-center ">Carregando...</p>;
    }

    if (agendas.length === 0) {
      return <p>Nenhum agendamento encontrado.</p>;
    }

    return agendas.map((a) => (
      <AgendamentoCard
        key={a.id}
        service={a.service.nome}
        status={a.status}
        url={a.service.images[0]?.url}
        date={formatRelativeTime(a.date)}
        time={new Date(a.date).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        showOptios
        onCancel={() => handleCancelAgendamento(a.id)}
        onDelete={() => handleDeleteAgendamento(a.id)}
      />
    ));
  };

  return (
    <div>
      <GeneralHeader>
        <div className="flex justify-between items-center gap-4">
          <div className="flex w-full flex-1">
            <section>
              <h1 className="text-3xl font-bold">Minha agenda</h1>
            </section>
          </div>

          <SwitchTheme hideLabel />
        </div>
      </GeneralHeader>

      <div className="p-3 pt-6 gap-4 flex flex-col">{renderContent()}</div>
    </div>
  );
}
