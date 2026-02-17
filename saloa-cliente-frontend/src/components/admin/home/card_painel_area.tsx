import {
  GetAllAgendaentosServer,
  GetClientesLimitedServer,
  GetProfissionaisLimitedServer,
} from "@/services/server/service-server.service";
import { GetAllServices } from "@/services/servico.service";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CardPainel from "./card_painel";

export default async function CardPainelArea() {
  const servicos = await GetAllServices();
  const clintes = await GetClientesLimitedServer();
  const funcions = await GetProfissionaisLimitedServer();
  const agendamentos = await GetAllAgendaentosServer();

  return (
    <div className="container">
      <div className="w-full dashboard-grid">
        <CardPainel
          Title="Total de clientes"
          CountNumber={clintes?.length || 0}
          icon={faUsers}
          Descriptions={
            "Numero exato de quantos de quantos usuarios temos em nossa plataforma"
          }
        />
        <CardPainel
          Title="Total de funcionários"
          CountNumber={funcions?.length || 0}
          icon={faUsers}
          Descriptions={
            "Numero total de quantos de quantos funcionarios temos temos em nossa plataforma"
          }
        />
        <CardPainel
          Title="Total de serviços prestados"
          CountNumber={servicos.length || 0}
          icon={faUsers}
          Descriptions={"numero total de serviços prestados"}
        />
        <CardPainel
          Title="Total de agendamentos ativos"
          CountNumber={agendamentos?.length || 0}
          icon={faUsers}
          Descriptions={"Total de agendamentos ativos"}
        />
      </div>
    </div>
  );
}
