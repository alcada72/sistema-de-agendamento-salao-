import { NavButtons } from "@/components/nav/nav-buttons";
import { NavItem } from "@/components/nav/nav-item";
import { NavLogout } from "@/components/nav/nav-logout";
import { Logo } from "@/components/ui/logo";
import {
  faBookmark,
  faHouse,
  faTools
} from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "J.M.C- Proficional - CACHIUNGO",
  description:
    "Cyber, comércio e prestações de serviços, sistema de agendamento de serviços.",
};

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screen  flex justify-center mx-auto max-w-7xl">
      <section
        className="lg:flex hidden flex-col bg w-72 border-r 
      sticky top-0 border-gray-900 h-screen"
      >
        <div className="flex-1 mt-6">
          <Logo size={40} />
          <div className="mt-11 mr-2 ">
            <NavItem label={"Pagina Inicial"} icon={faHouse} href={"/home"} />
            <NavItem
              label={"Minha Agenda"}
              icon={faBookmark}
              href={"/home/agendamentos"}
            />

            <NavItem label={"Configurações"} icon={faTools} href={"/config"} />
          </div>
        </div>

        <nav className="mb-2">
          <NavLogout />
        </nav>
      </section>

      <div className="flex-1 bg max-w-2xl shrink-0 w-full">{children}</div>

      <aside
        className="hidden lg:flex flex-col items-start sticky
       border-l bg w-30 border-gray-900 top-0 h-screen px-2 py-6"
      >
        <div className="flex-1 mt-6 flex flex-col items-start gap-5">
          <NavButtons />
        </div>

        <div className=" flex flex-col items-center justify-between">
          <span className="text-lg text-gray-400">
            versão <span className="color font-bold">1.0.0</span>
          </span>
        </div>
      </aside>
    </main>
  );
}
