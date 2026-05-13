import CardPainel from "@/components/admin/home/card_painel";
import { GetAllAgendaentosByProfServer } from "@/services/prof/server/service-server.service";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default async function CardPainelAreaPof() {
  const agendamentos = await GetAllAgendaentosByProfServer();

  const confirmed = agendamentos?.filter((n) => n.status === "CONFIRMED");

  return (
    <div className="container">
      <div className="w-full dashboard-grid md">
        <CardPainel
          Title="Agendamentos"
          CountNumber={agendamentos?.length || 0}
          icon={faUsers}
          Descriptions={"Total de agendamentos realizados"}
        />
        <CardPainel
          Title="confirmados"
          CountNumber={confirmed?.length || 0}
          icon={faUsers}
          Descriptions={"Total de agendamentos confirmados"}
        />
      </div>
    </div>
  );
}
