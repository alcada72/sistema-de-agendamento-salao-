"use client";
import { bookMrak } from "@/types/servicos";
import { formatRelativeTime } from "@/utils/format-ralative";
import { formatDuration } from "@/utils/formateDuration";
import { FormatPrice } from "@/utils/formatePrice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonMark } from "./buttonMark";

interface Props {
  mark: bookMrak;
}
export function ServiceCardMini({ mark }: Props) {
  const router = usePathname();
  const isAdmin = router.startsWith("/admin");

  const cover = mark.service.images?.[0]?.url ?? null;

  return (
    <Link
      title={mark.service.nome}
      href={
        !isAdmin
          ? "/home/services/" + mark.service.id
          : "/admin/services/" + mark.service.id
      }
      className={`flex justify-between items-center bg-neutral-400/30 
    backdrop-blur-md p-2 border border-neutral-200/30
     rounded-xl flex-1 w-full min-w-[380px] relative`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="overflow-hidden size-24 rounded-md ">
          <img
            src={cover}
            alt={mark.service.nome}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full  bg-neutral-400/30"
          />
        </div>

        <div className="flex flex-col  flex-1 justify-between truncate overflow-hidden w-full h-full">
          <span className="flex items-center gap-1.5">
            <p className="font-semibold text-lg truncate max-w-9/12">
              {mark.service.nome}
            </p>
            <p className="font-extralight text-xs truncate">
               {formatRelativeTime(mark.createdAt)}
            </p>
          </span>

          <div className=" gap-3">
            <span className="flex items-center gap-2">
              <p className="text-sm truncate block">
                {mark.service.description}
              </p>
            </span>

            <div className="flex flex-col md:flex-row md:items-center md:gap-1 ">
              <span className="flex items-center gap-2">
                <span className="text-[10px]">Duração</span>
                <span className="text-lg">
                  {formatDuration(mark.service.duration)}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <p className="text-[10px]">Preço</p>
                <span className="text-amber-300 text-lg">
                  {FormatPrice(mark.service.price)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <ButtonMark id={mark.service.id} />
      </div>
    </Link>
  );
}
