"use client";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  user: User;
}

export const HardFuncionarioCard = ({ user }: Props) => {
  const router = usePathname();
  const isAdmin = router.startsWith("/admin");
  
  const cover = user?.image;
  return (
    <Link
      href={isAdmin ? "#" : `/person/${user?.id}`}
      className="border size-full border-neutral-400/30 rounded-lg w-full shadow shadow-black/30
      flex-1 min-w-48.25 md:min-w-45 max-w-1/3 md:max-w-1/4 overflow-hidden"
    >
      <div
        className="flex-1 overflow-hidden rounded-lg
        min-h-45 max-h-45 size-full aspect-video relative p-0"
      >
        {user?.image.length > 0 && (
          <img
            src={cover}
            alt={user?.nome}
            title={user.nome}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full bg-neutral-400/30"
          />
        )}
        <div
          className="absolute -bottom-1 left-0 size-full bg-linear-to-t
         from-black/95 via-transparent to-transparent  flex items-end px-2
        "
        >
          <div className="flex flex-col justify-center items-start w-full mb-2">
            <div className="flex justify-between items-center w-full ">
              <h2 className="flex-1 truncate text-sm w-full max-w-30 font-semibold text-white">
                {user.nome}
              </h2>
             
            </div>
            <span className="text-[10px] text-yellow-500 block truncate">
              {user?.categoria}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
