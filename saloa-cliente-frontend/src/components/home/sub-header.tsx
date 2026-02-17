import { getUserMeServiceServer } from "@/services/server/user.service";
import { Today } from "@/utils/today";
import Link from "next/link";

export default async function Subheader() {
    const user = await getUserMeServiceServer();
  
  const date = Today();


  if (!user) {
    return <SubheaderSkeleton />;
  }

  return (
    <div className={`flex items-center justify-between z-10 w-full p-2 px-4`}>
      <div className="flex items-center gap-2">
        <div
          className="overflow-hidden  size-14 
           rounded-full aspect-auto "
        >
          <Link href={"/profile"}>
            <img
              src={user.image}
              loading="lazy"
              draggable="false"
              alt={"Foto de perfil de " + user.nome}
              crossOrigin="anonymous"
              className="object-cover size-full aspect-video bg-neutral-400/30"
            />
          </Link>
        </div>
        <span className="flex-1 flex flex-col items-start justify-between gap-0.5">
          <p className="text-2xl md:text-2xl m-0 font-semibold truncate w-full max-w-[320px]">
            Olá, {user.nome.split(" ")[0]}👋
          </p>
          <p className="opacity-80 text-md z-0 truncate w-full max-w-[320px]m-0">
            {date}
          </p>
        </span>
      </div>
    </div>
  );
}

export const SubheaderSkeleton = () => {
  return (
    <div
      className={`flex items-center z-10 w-full p-2 px-4 animate-pulse flex-1 `}
    >
      <div className="flex items-center  w-full gap-2">
        <div
          className="overflow-hidden bg-gray-700  size-16 
           rounded-full aspect-auto "
        ></div>
        <div
          className="flex-1 flex flex-col items-start justify-between gap-0.5 
        w-full "
        >
          <div className="rounded-md w-1/2 max-w-[320px] bg-gray-700 h-1 p-2"></div>
          <div
            className="rounded-md w-1/3 
           bg-gray-700 p-1 "
          ></div>
        </div>
      </div>
    </div>
  );
};
