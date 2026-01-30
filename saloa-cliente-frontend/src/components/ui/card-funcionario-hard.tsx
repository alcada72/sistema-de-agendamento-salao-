"use client";
import { User } from "@/types/user";
import { formatDuration } from "@/utils/formateDuration";
import { FormatPrice } from "@/utils/formatePrice";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  funcion: User;
}

export const HardFuncionarioCard = ({ funcion: service }: Props) => {
  const cover = service.image;

  return (
    <div
      className="border-1 size-full border-neutral-400/30 rounded-lg w-full
      flex-1 min-w-[193px] md:min-w-[180px] max-w-1/2 md:max-w-1/4 overflow-hidden"
    >
      <div
        className="flex-1 overflow-hidden rounded-lg
        min-h-[180px] max-h-[180px] size-full aspect-video relative p-0"
      >
        {service.image.length > 0 && (
          <img
            src={cover}
            alt={service.nome}
            title={service.role}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full bg-neutral-400/30"
          />
        )}
        <div
          className="absolute -bottom-1 left-0 size-full bg-gradient-to-t
         from-black via-transparent to-transparent  flex items-end px-2
        "
        >
          <div className="flex justify-between items-center w-full mb-2">
            <h2 className="flex-1 truncate text-sm w-full max-w-30 font-semibold text-white">
              {service.nome}
            </h2>
            <span className="block  truncate text-sm font-semibold text-white">
              5
              <FontAwesomeIcon
                icon={faStar}
                className="text-amber-300 ml-0.5 text-sm"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
