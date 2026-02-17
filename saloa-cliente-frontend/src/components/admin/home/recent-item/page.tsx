"use client";
import { Badge } from "@/components/ui/badge";
import { CancelAgendamentoById } from "@/services/admin/servico.service";
import { DeleteAgendamentoById } from "@/services/servico.service";
import { service } from "@/types/servicos";
import {
  faArchive,
  faBriefcaseClock,
  faCheck,
  faCheckDouble,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  id: string;
  service: service;
  date: string;
  time: string;
  client: string;
  url: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
}

export default function AgendamentoList({
  service,
  date,
  time,
  client,
  status,
  id,
}: Props) {
  const statusMap = {
    CONFIRMED: { label: "Confirmado", color: "green" },
    COMPLETED: { label: "Completado", color: "green" },
    PENDING: { label: "Pendente", color: "yellow" },
    CANCELLED: { label: "Cancelado", color: "red" },
  } as const;

  const handleChangeStatus = async (
    status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED",
  ) => {
    if (confirm(`Este item sera ${statusMap[status].label}`)) {
      const deleted = await CancelAgendamentoById(id, status);

      if (deleted) {
        alert(`Item ${statusMap[status].label} com sucesso`);
      } else {
        alert(`${statusMap[status].label} falhous`);
      }
    }
  };

  const handleDeleteAgendamento = async () => {
    if (confirm("Deseja mesmo eliminar este item da agenda")) {
      const deleted = await DeleteAgendamentoById(id);

      if (deleted) {
        alert("Eliminado");
      } else {
        alert("não Eliminado");
      }
    }
  };

  return (
    <tr>
      <td title={service.nome}>{service.nome}</td>
      <td title={`  ${date} / ${time}`}>
        {date} / {time}
      </td>
      <td title={client}> {client} </td>
      <td>
        <Badge text={statusMap[status].label} color={statusMap[status].color} />
      </td>
      <td>
        <div className="flex items-center justify-start gap-1.5">
          {status !== "CANCELLED" && (
            <button
              title="Cancelar"
              className="text-amber-500 hover:scale-125 border-0 outline-0 bg-transparent"
              onClick={() => handleChangeStatus("CANCELLED")}
            >
              <FontAwesomeIcon icon={faX} className=" size-7" />
            </button>
          )}

          <button
            title="Eliminar"
            className="text-red-600 border-0 outline-0 bg-transparent hover:scale-125"
            onClick={handleDeleteAgendamento}
          >
            <FontAwesomeIcon icon={faArchive} className=" size-7" />
          </button>

          <button
            title="Aceitar Pedido"
            className="text-green-600 border-0 outline-0 bg-transparent hover:scale-125"
            onClick={() => handleChangeStatus("CONFIRMED")}
          >
            <FontAwesomeIcon icon={faCheck} className=" size-7" />
          </button>
          <button
            title="Manter pendente"
            className="text-yellow-700 border-0 outline-0 bg-transparent hover:scale-125"
            onClick={() => handleChangeStatus("PENDING")}
          >
            <FontAwesomeIcon icon={faBriefcaseClock} className=" size-7" />
          </button>
          <button
            title="Marcar com finalizado"
            className="text-blue-600 border-0 outline-0 bg-transparent hover:scale-125"
            onClick={() => handleChangeStatus("COMPLETED")}
          >
            <FontAwesomeIcon icon={faCheckDouble} className=" size-7" />
          </button>
        </div>
      </td>
    </tr>
  );
}
