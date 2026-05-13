import { AgendamentoCard } from "@/components/agendamento/agendamentoCard";
import { GetAllAgendaentosByProfServer } from "@/services/prof/server/service-server.service";
import { formatHour, formatRelativeTime } from "@/utils/format-ralative";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function ProximosagendamentosProf() {
  const agenda = await GetAllAgendaentosByProfServer();
  console.log(agenda);

  if (!agenda) {
    return null;
  }
  if (agenda.length === 0) {
    return (
      <div className="flex flex-col text-gray-400 gap-2 items-center justify-center p-2.5">
        <h3>Não tem nenhum pedido na sua agenda</h3>
        <FontAwesomeIcon icon={faClipboardList} className="text-4xl " />
      </div>
    );
  }
  const proximo = agenda.slice(0, 10);

  if (!proximo || proximo.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Seu próximo horário</h2>
        <Link href={"home/agendamentos"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div className="flex w-full items-center gap-4 overflow-x-auto px-4 hide-scroobar">
        {proximo.map((n) => (
          <AgendamentoCard
            key={n.id}
            url={n.service.images?.[0]?.url}
            service={n.service.nome}
            date={formatRelativeTime(n.date)}
            time={formatHour(n.date)}
            status={n.status}
          />
        ))}
      </div>
    </div>
  );
}
