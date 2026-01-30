"use client";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faArchive,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface Props {
  service: string;
  date: string;
  time: string;
  url: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  showOptios?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
}

export function AgendamentoCard({
  service,
  date,
  time,
  url,
  status,
  showOptios,
  onCancel,
  onDelete,
}: Props) {
  const [more, setmore] = useState(false);

  const statusMap = {
    CONFIRMED: { label: "Confirmado", color: "green" },
    COMPLETED: { label: "Completado", color: "green" },
    PENDING: { label: "Pendente", color: "yellow" },
    CANCELLED: { label: "Cancelado", color: "red" },
  } as const;

  return (
    <div
      className={`flex justify-between ${
        showOptios ? "items-end-safe" : "items-center"
      } bg-neutral-400/30 
    backdrop-blur-md p-2 border border-neutral-200/30
     rounded-xl flex-1 w-full min-w-[380px] relative`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="overflow-hidden size-24 rounded-md ">
          <img
            src={url}
            alt={service}
            loading="lazy"
            draggable="false"
            crossOrigin="anonymous"
            className="object-cover size-full  bg-neutral-400/30"
          />
        </div>

        <div className="flex flex-col  flex-1 justify-between truncate overflow-hidden w-full h-full">
          <p className="font-semibold text-lg truncate">{service}</p>
          <div className=" gap-3">
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-lg size-7" />
              <p className="text-sm">{date}</p>
            </span>
            <span className="flex items-center gap-2 mt-1">
              <FontAwesomeIcon icon={faClock} className="text-lg size-7" />
              <p className="text-sm">{time}</p>
            </span>
          </div>
        </div>
      </div>

      <Badge text={statusMap[status].label} color={statusMap[status].color} />

      <div className="absolute top-0 right-0 z-40 flex flex-col items-end-safe gap-2">
        {showOptios && (
          <button
            className="flex items-center gap-2 m-1"
            onClick={() => setmore(!more)}
          >
            <FontAwesomeIcon
              icon={more ? faChevronUp : faChevronDown}
              className="text-lg size-7"
            />
          </button>
        )}

        {more && (
          <div className="shadow-2xl shadow-black bg-gray-600 p-1 rounded-md ">
            {status !== "CANCELLED" && (
              <button
                className="flex items-center gap-0.5 bg-amber-800 p-0.5 rounded-sm w-full"
                onClick={() => {
                  onCancel;
                  setmore(false);
                }}
              >
                <FontAwesomeIcon icon={faArchive} className="text-lg size-7" />

                <span>Cancelar </span>
              </button>
            )}

            <div className="w-full bg-gray-300 h-[1px] my-1"></div>

            <button
              className="flex items-center gap-0.5 bg-red-800 p-0.5 rounded-sm w-full"
              onClick={() => {
                onDelete;
                setmore(false);
              }}
            >
              <FontAwesomeIcon icon={faArchive} className="text-lg size-7" />

              <span>Eliminar </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
