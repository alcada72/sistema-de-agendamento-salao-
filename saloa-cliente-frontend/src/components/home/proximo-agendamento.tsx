import { GetAllAgendaentosByUserServer } from "@/services/server/service-server.service";
import { formatHour, formatRelativeTime } from "@/utils/format-ralative";
import Link from "next/link";
import { AgendamentoCard } from "../agendamento/agendamentoCard";

export default async function Proximoagendamento() {
  const agenda = await GetAllAgendaentosByUserServer();

  if (!agenda || agenda.length === 0) {
    return null
  }

  const proximo = agenda[0];


  if (!proximo.service) {
    return null;
  }

  return (
    <div className="w-full">
      
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Seu próximo horário</h2>
        <Link href={"/home/agendamentos"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div className="flex w-full items-center gap-4 overflow-x-auto px-4 hide-scroobar">
        <AgendamentoCard
          url={proximo.service.images?.[0]?.url}
          service={proximo.service.nome}
          date={formatRelativeTime(proximo.date)}
          time={formatHour(proximo.date)}
          status={proximo.status}
        />
      </div>
    </div>
  );
}
