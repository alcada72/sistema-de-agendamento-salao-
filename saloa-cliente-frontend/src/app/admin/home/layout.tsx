import { NavLogoutAdmin } from "@/components/admin/nav/nav-logout";
import { NavUserInfoAdmin } from "@/components/admin/nav/nav-user-info";
import { NavItem } from "@/components/nav/nav-item";
import { Logo } from "@/components/ui/logo";
import SwitchTheme from "@/components/ui/SwitchTheme";
import {
  faBook,
  faClock,
  faHouse,
  faUserAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "J.M.C- ADMIN - CACHIUNGO",
  description: "Cyber, comércio e prestações de serviços, sistema de agendamento de serviços.",
};

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screen px-3 flex justify-center mx-auto max-w-[2080px]">
      <section
        className="lg:flex hidden flex-col w-60
       border-r sticky top-0 border-gray-900 h-screen"
      >
        <div className="flex-1 mt-6">
          <div className="w-full flex items-center justify-between">
            <Logo size={54} /> <SwitchTheme hideLabel />
          </div>
          <div className="mt-11 mr-2">
            <NavItem label={"DashBoard"} icon={faHouse} href={"/admin/home"} />
            <NavItem
              label={"Nossos Serviços"}
              icon={faBook}
              href={"/admin/home/services"}
            />
            <NavItem
              label={"Clientes"}
              icon={faUsers}
              href={"/admin/home/clientes"}
            />
            <NavItem
              label={"Funcionarios"}
              icon={faUserAlt}
              href={"/admin/home/funcionarios"}
            />
            <NavItem
              label={"Agendamentos"}
              icon={faClock}
              href={"/admin/home/bookings"}
            />
          </div>
        </div>

        <nav className="mb-2">
          <NavLogoutAdmin />
          <NavUserInfoAdmin />
        </nav>
      </section>
      <div className=" lg:hidden size-full fixed inset-0 bg z-50 flex items-center justify-center">
        <span className="text-2xl text-center select-none p-2">
          O sistema não tem de ser abertos em telas menores
        </span>
      </div>
      <div className="flex-1 w-full shrink-0 hidden lg:block">{children}</div>
    </main>
  );
}
