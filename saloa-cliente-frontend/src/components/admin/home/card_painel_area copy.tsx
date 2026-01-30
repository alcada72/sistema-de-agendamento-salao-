import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CardPainel from "./card_painel";

export default function CardPainelArea() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 mt-0.5">
      <span className="text-2xl text-center uppercase">Painel de dados</span>
      <div className="w-full grid md:grid-cols-5 grid-cols-2 place-items-center gap-2 md:gap-0.5">
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
