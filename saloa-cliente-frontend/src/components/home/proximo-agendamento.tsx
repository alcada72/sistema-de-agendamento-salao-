import { GetAllAgendaentosServer } from "@/services/server/service-server.service";
import { formatRelativeTime } from "@/utils/format-ralative";
import Link from "next/link";
import { AgendamentoCard } from "../agendamento/agendamentoCard";

export default async function Proximoagendamento() {
  const agenda = await GetAllAgendaentosServer();
  if (!agenda) {
    return null;
  }
  return (
    <div className="w-full">
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Seu proximo horario</h2>
        <Link href={"/home/agendamentos"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div
        className="flex w-full max-w- items-center
       gap-4 overflow-y-hidden overflow-x-auto px-4 hide-scroobar"
      >
        <AgendamentoCard
          url={agenda[0].service.images[0].url}
          service={agenda[0].service.nome}
          date={formatRelativeTime(agenda[0].date)}
          time={agenda[0].date
            .toString()
            .split("T")[1]
            .replace(":00.000Z", " Horas")}
          status={agenda[0].status}
        />
      </div>
    </div>
  );
}
