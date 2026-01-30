import { Badge } from "@/components/ui/badge";

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

export default function AgendamentoList({
  service,
  date,
  time,
  url,
  status,
  showOptios,
  onCancel,
  onDelete,
}: Props) {
  const statusMap = {
    CONFIRMED: { label: "Confirmado", color: "green" },
    COMPLETED: { label: "Completado", color: "green" },
    PENDING: { label: "Pendente", color: "yellow" },
    CANCELLED: { label: "Cancelado", color: "red" },
  } as const;

  return (
    <tr>
      <td>João Manuel Silva</td>
      <td>Engenharia Informática</td>
      <td>2º Ano</td>
      <td>
        <Badge text={statusMap[status].label} color={statusMap[status].color} />
      </td>
      <td>
        <div className="action-btns">
          <button className="btn-icon" title="Editar">
            ✏️
          </button>
          <button className="btn-icon" title="Ver">
            👁️
          </button>
        </div>
      </td>
    </tr>
  );
}
