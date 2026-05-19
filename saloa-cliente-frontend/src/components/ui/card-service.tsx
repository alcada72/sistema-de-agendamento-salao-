"use client";
import { DeleteServiceAdmin } from "@/services/admin/servico.service";
import { service } from "@/types/servicos";
import { formatCountMax } from "@/utils/format-Count";
import { formatDuration } from "@/utils/formateDuration";
import { FormatPrice } from "@/utils/formatePrice";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonMark } from "./buttonMark";

interface Props {
  service: service;
}

export const CardService = ({ service }: Props) => {
  const router = usePathname();
  const isAdmin = router.startsWith("/admin");

  const cover = service.images?.[0]?.url ?? null;

  const HandleDeleteService = async () => {
    if (!isAdmin) return;
    const confirmar = confirm("Deseja mesmo eliminar este serviço?");

    if (!confirmar) return;

    const res = await DeleteServiceAdmin(service.id);

    if (res) {
      alert("Serviço eliminado com sucesso");
      globalThis.location.reload();
    } else {
      alert("Erro ao eliminar serviço, O serviço tem agendamentos");
    }
  };

  return (
    <Link
      title={service.nome}
      href={isAdmin ? "#" : "/home/services/" + service.id}
      className="border-1 size-full border-gray-900/70 rounded-lg w-full
      flex-1 min-w-[193px] md:min-w-[180px]  max-w-1/3 md:max-w-1/4 overflow-hidden 
      relative shadow shadow-black/30"
    >
      {isAdmin && (
        <div className="absolute top-2 right-2 z-50 flex gap-2">
          {/* <button
            className="bg-blue-600/90 hover:bg-blue-700
            text-white text-xs px-2 py-1 rounded-md
            backdrop-blur-md transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              HandleDeleteService();
            }}
          >
            Editar
          </button> */}

          <button
            className="bg-red-600/90 hover:bg-red-700
      text-white text-xs px-2 py-1 rounded-md
      backdrop-blur-md transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              HandleDeleteService();
            }}
          >
            Apagar
          </button>
        </div>
      )}

      <div
        className="flex-1 overflow-hidden rounded-lg
        min-h-[180px] max-h-[180px] size-full aspect-video p-1 relative"
      >
        {service.images.length > 0 && (
          <img
            src={cover}
            alt={service.description}
            title={service.nome}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full bg-neutral-400/30 rounded shadow"
          />
        )}
        <div
          className="absolute inset-0 size-full opacity-0 hover:opacity-100 transition-all duration-150 
        bg-gradient-to-b
         from-black/50 via-transparent to-transparent"
        >
          {!isAdmin && (
            <div className="absolute top-2 right-2">
              <ButtonMark id={service.id} />
            </div>
          )}
        </div>
      </div>
      <div className="p-1">
        <div className="flex justify-between items-center">
          <h2 className="flex-1 truncate text-sm w-full max-w-40 font-bold">
            {service.nome}
          </h2>
          <span className="block  truncate text-sm font-semibold">
            <FontAwesomeIcon
              icon={faComment}
              className="text-blue-300 ml-0.5 text-sm"
            />{" "}
            {formatCountMax(service.comments.length, 99)}
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
            <span className="text-[10px] text-end">Duração</span>
            <span className="text-lg">{formatDuration(service.duration)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
