import { EditPassForm } from "@/components/profile/edit-pass-Form";
import { GeneralHeader } from "@/components/ui/general-header";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { getUserMeServiceServer } from "@/services/server/user.service";

export default async function Page() {
  const user = await getUserMeServiceServer();
  if (!user) {
    return <ActiveProgressIndicator />;
  }   
  return (
    <div className="w-full flex flex-col gap-12 relative min-h-screen">
      <GeneralHeader noFixed>
        <div className="flex justify-between items-center gap-4 mt-5 md:mt-0">
          <div className="flex flex-col w-full flex-1">
            <section>
              <h1 className="text-2xl font-bold ">Alterar a palavra passe</h1>
            </section>
            <div className="flex-col flex">
              <span className="text-gray-500 font-semibold text-lg">
                Altere as informações
              </span>
              <span className="text-gray-400 font-medium">
                As informações subsequentes têm que ser veridicos
              </span>
            </div>
          </div>
          <SwitchTheme hideLabel />
        </div>
      </GeneralHeader>
      <div className="p-6 ">
        <EditPassForm user={user} />
      </div>
    </div>
  );
}
