import { Header } from "@/components/ui/header";
import { NavigatorBar } from "@/components/ui/navigationsbar";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { faList, faLock, faShield, faUser } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  return (
    <div className="flex-col h-dvh ">
      <Header />
      <div>
        <div className="flex items-center justify-between border-b border-gray-800 py-2 px-3">
          <span className="text-lg font-semibold select-none">
            Trocar o Tema
          </span>
          <SwitchTheme />
        </div>

        <NavigatorBar
          reverse
          label="Alterar informacões do Perfil"
          icon={faUser}
          href="/profile/edit"
        />
        <NavigatorBar
          reverse
          label="Alterar Palavra passe"
          icon={faLock}
          href="/profile/edit/password"
        />
        <NavigatorBar
          reverse
          label="Termos e Condições"
          icon={faList}
          href="/termos"
        />
        <NavigatorBar
          reverse
          label="Política de Privacidade"
          icon={faShield}
          href="/termos/politica"
        />
      </div>
    </div>
  );
}
