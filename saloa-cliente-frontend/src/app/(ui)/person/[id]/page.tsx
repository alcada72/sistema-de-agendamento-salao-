"use client";
import { Badge } from "@/components/ui/badge";
import { GeneralHeader } from "@/components/ui/general-header";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { getUserByIdService } from "@/services/user.service";
import { User } from "@/types/user";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: Props) {
  const { id } = use(params);

  const [user, setuser] = useState<User>();

  async function getPerson() {
    try {
      const response = await getUserByIdService(id);
      setuser(response);
    } catch (error) {
      console.log("erro ao buscar pessao", error);
    }
  }

  useEffect(() => {
    getPerson;
    return () => {
      getPerson();
    };
  }, []);

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
              <h1 className="text-3xl font-bold ">{user.nome}</h1>
            </section>
            <div>
              <span className="text-gray-400">
                Veja as informaçãoes de {user.nome}
              </span>
            </div>
          </div>
          <SwitchTheme hideLabel />
        </div>
      </GeneralHeader>
      <div className="mt-[110px] md:mt-0 w-full flex flex-col items-center">
        <div className="mt-10 md:mt-5 flex flex-col items-center overflow-hidden">
          <div
            className="overflow-hidden size-40 mb-2.5  
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
           <Badge text={user.role} color="green" />
          <div className="flex flex-col items-center">
            <span className="text-center px-6 max-w-[100%] text-3xl font-bold mt-8">
              {user.nome}
            </span>
           
            <p className="text-center truncate text-gray-500 px-6 max-w-[100%] text-base ">
          <strong className="color">Telefone:</strong>    {user.telefone}
            </p>
             <p className="text-center truncate text-gray-500 px-6 max-w-[100%] text-base ">
               <strong className="color">E-mail:</strong>    {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
