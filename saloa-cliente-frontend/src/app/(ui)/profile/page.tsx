import { NavLogout } from "@/components/nav/nav-logout";
import { NavItemProfile } from "@/components/profile/nav-item-profile";
import { GeneralHeader } from "@/components/ui/general-header";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { getUserMeServiceServer } from "@/services/server/user.service";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default async function Profile() {
  const user = await getUserMeServiceServer();

  if (!user) {
    return (
      <div className="w-full min-h-dvh items-center justify-center flex">
        <ActiveProgressIndicator />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-dvh">
      <GeneralHeader>
        <div className="flex justify-between items-center gap-4 mt-5 md:mt-0">
          <div className="flex flex-col w-full flex-1">
            <section>
              <h1 className="text-3xl font-bold ">Meu Perifl</h1>
            </section>
            <div>
              <span className="text-gray-400">
                Veja as tuas informaçãoes e altere a se necessario
              </span>
            </div>
          </div>
          <SwitchTheme hideLabel />
          <NavLogout hiddenLabel />
        </div>
      </GeneralHeader>
      <div className="mt-[110px] md:mt-0 w-full flex flex-col items-center">
        <div className="mt-10 md:mt-5 flex flex-col items-center overflow-hidden">
          <div
            className="overflow-hidden size-40  
           rounded-full aspect-auto md:aspect-square border-4 border-blue-500"
          >
            <img
              src={user.image}
              alt="Foto de perfil"
              loading="lazy"
              draggable="false"
              crossOrigin="anonymous"
              className="object-cover size-full aspect-video"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-center px-6 max-w-[100%] text-3xl font-bold mt-8">
              {user.nome}
            </span>
            <p className="text-center truncate text-gray-500 px-6 max-w-[100%] text-base ">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-4 gap-3 flex flex-col">
        <NavItemProfile
          href="/profile/edit"
          icon={faUser}
          label="Editar perfil"
        />
        <NavItemProfile
          href="/profile/edit/password"
          icon={faLock}
          label="Altera a senha"
        />
        <NavItemProfile href="/home/agendamentos" icon={faCalendar} label="Minha agenda" />
      </div>
    </div>
  );
}
