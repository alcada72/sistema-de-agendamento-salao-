import { GetAllAgendaentosServer } from "@/services/server/service-server.service";
import { formatHour, formatRelativeTime } from "@/utils/format-ralative";
import Link from "next/link";
import AgendamentoList from "../recent-item/page";

export default async function RecentArea() {
  const agendamentos = await GetAllAgendaentosServer();
  const agenda = agendamentos?.slice(0, 5);
  return (
    <div className="content-card">
      <div className="w-full mb-5 items-center justify-between flex border-neutral-300 border-b-1 backdrop-blur-2xl p-1">
        <span className="text-2xl font-semibold ">Agendamentos Recentes</span>
        <Link
          href={"/admin/home/bookings"}
          title="ver todos os agendametos"
          className="text-blue-500 hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome </th>
              <th>Data / hora</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="studentTable">
            {agenda &&
              agenda?.length !== 0 &&
              agenda.map((a) => (
                <AgendamentoList
                  id={a.id}
                  client={a.client.nome}
                  key={a.id}
                  service={a.service}
                  status={a.status}
                  url={a.service.images?.[0]?.url as string}
                  date={formatRelativeTime(a.date)}
                  time={formatHour(a.date)}
                />
              ))}
          </tbody>
        </table>
        {!agenda ||
          (agenda?.length === 0 && (
            <p className="text-lg text-center mt-1.5">
              Não há agendas recentes
            </p>
          ))}
      </div>
    </div>
  );
}
