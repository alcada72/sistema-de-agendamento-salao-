"use client";
import { service } from "@/types/servicos";
import { formatDuration } from "@/utils/formateDuration";
import { FormatPrice } from "@/utils/formatePrice";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
  service: service;
}

export const CardService = ({ service }: Props) => {
const cover = service.images?.[0]?.url ?? null;

  return (
    <Link
      href={"/home/services/" + service.id}
      className="border-1 size-full border-gray-900 rounded-lg w-full
      flex-1 min-w-[193px] md:min-w-[180px] max-w-1/2 md:max-w-1/3 overflow-hidden"
    >
      <div
        className="flex-1 overflow-hidden rounded-lg
        min-h-[180px] max-h-[180px] size-full aspect-video"
      >
        {service.images.length > 0 && (
          <img
            src={cover }
            alt={service.description}
            title={service.nome}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full bg-neutral-400/30"
          />
        )}
      </div>
      <div className="p-1">
        <div className="flex justify-between items-center">
          <h2 className="flex-1 truncate text-sm w-full max-w-40 font-bold">
            {service.nome}
          </h2>
          <span className="block  truncate text-sm font-semibold">
            5
            <FontAwesomeIcon
              icon={faStar}
              className="text-amber-300 ml-0.5 text-sm"
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex-1 flex flex-col truncate text-sm max-w-full justify-center">
            <span className="text-[10px]">Valor</span>
            <span className="text-amber-300 text-lg">
              {FormatPrice(service.price)}
            </span>
          </span>
          <span className="truncate text-sm flex flex-col justify-center">
            <span className="text-[10px]">Duração</span>
            <span className="text-lg">{formatDuration(service.duration)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
