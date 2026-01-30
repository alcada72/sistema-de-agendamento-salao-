import { NavLogout } from "@/components/nav/nav-logout";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function Page() {
  return (
    <div>
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
    </div>
  );
}
