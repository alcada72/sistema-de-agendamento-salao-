"use client";
import {
  faBook,
  faBookmark,
  faHouse,
  faStar,
  faTools,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavItem } from "../nav/nav-item";
import { Logo } from "../ui/logo";
import SwitchTheme from "../ui/SwitchTheme";

type Props = {
  activeMenu: () => void;
};
export const MenuHome = ({ activeMenu }: Props) => {
  return (
    <div className="lg:hidden overflow-hidden fixed bg z-50  inset-0 w-full min-h-dvh flex flex-col">
      <div className="flex items-center justify-between border-b-1 border-b-gray-900 p-2">
        <div className="flex items-center">
          <Logo size={40} />
          <div className="text-2xl font-semibold">Buta Cortes</div>
        </div>

        <div className="px-2">
          <button
            onClick={activeMenu}
            className="
          cursor-pointer hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
      </div>

      <nav className="flex-1 flex flex-col p-5 pt-0 relative max-w-full">
        <NavItem label={"Pagina Inicial"} icon={faHouse} href={"/home"} />
        <NavItem label={"Meu Perfil"} icon={faUser} href={"/profile"} />
        <NavItem
          label={"Nossos Serviços"}
          icon={faBook}
          href={"/home/services"}
        />
        <NavItem label={"Configurações"} icon={faTools} href={"/config"} />
        <NavItem
          label={"Agenda"}
          icon={faBookmark}
          href={"/home/agendamentos"}
        />
        <NavItem
          label={"Meus Favoritos"}
          icon={faStar}
          href={"/home/favorite"}
        />
      </nav>

      <div className="p-5 flex flex-row items-center justify-between">
        <span className="flex flex-col items-start justify-center">
          <SwitchTheme flex />
        </span>

        <div className="flex items-center ">
          <span className="text-sm text-gray-400">
            versão <span className="font-semibold ">1.0.0</span>
          </span>
        </div>
      </div>
    </div>
  );
};
