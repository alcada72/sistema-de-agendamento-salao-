import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CardPainel from "./card_painel";

export default function CardPainelArea() {
  return (
    <div className="container">
      <div className="w-full dashboard-grid">
        <CardPainel
          Title="Total de usuarios"
          CountNumber={"12"}
          icon={faUsers}
          Descriptions={"Total de usuario do sistema"}
        />
        <CardPainel
          Title="Total de usuarios"
          CountNumber={"12"}
          icon={faUsers}
          Descriptions={"Total de usuario do sistema"}
        />
        <CardPainel
          Title="Total de usuarios"
          CountNumber={"12"}
          icon={faUsers}
          Descriptions={"Total de usuario do sistema"}
        />
        <CardPainel
          Title="Total de usuarios"
          CountNumber={"12"}
          icon={faUsers}
          Descriptions={"Total de usuario do sistema"}
        />
      </div>
    </div>
  );
}
