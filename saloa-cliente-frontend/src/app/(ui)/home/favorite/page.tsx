import { ServiceCardMini } from "@/components/ui/card-service-mini";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { getBookmarksServer } from "@/services/server/user.service";

export default async function Page() {
  const result = await getBookmarksServer();

  return (
    <div className="flex flex-col w-full  overflow-y-auto overflow-x-hidden h-full">
      <GeneralHeader >
        <div className="flex justify-between items-center gap-4 mt-5 md:mt-0">
          <div className="flex flex-col w-full flex-1">
            <section>
              <h1 className="text-3xl font-bold ">Meus favoritos</h1>
            </section>
            <div>
              <span className="text-gray-400">
                Veja os serviços que você marcou como favoritos e agende com
                facilidade
              </span>
            </div>
          </div>
          <SwitchTheme hideLabel />
        </div>
      </GeneralHeader>

      <div className="flex flex-col gap-4 mt-3 md:mt-6 px-4 ">
        {result && result.map((s) => (
          <ServiceCardMini key={s.id} mark={s} />
        ))}

      </div>
    </div>
  );
}
