import AgendamentoList from "@/components/admin/home/recent-item/page";
import { Header } from "@/components/ui/header";
import { GetAllAgendaentosServer } from "@/services/admin/server/service-server.service";
import { formatHour, formatRelativeTime } from "@/utils/format-ralative";

export default async function page() {
  const agendamentos = await GetAllAgendaentosServer();
  return (
    <div className="w-full ">
      <Header />

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
            {agendamentos &&
              agendamentos?.length !== 0 &&
              agendamentos.map((a) => (
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
        {!agendamentos ||
          (agendamentos?.length === 0 && (
            <p className="text-lg text-center mt-1.5">
              Não há agendamentos Ainda
            </p>
          ))}
      </div>
    </div>
  );
}
