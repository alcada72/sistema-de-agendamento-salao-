import Link from "next/link";
import AgendamentoList from "../recent-item/page";

export default function RecentArea() {
  return (
    <div>
      <div className="w-full mb-5 items-center justify-between flex border-neutral-300 border-b-1 backdrop-blur-2xl p-1">
        <span className="text-2xl font-semibold ">Agendamentos Recentes</span>
        <Link
          href={"#"}
          title="ver todos os agendametos"
          className="text-blue-500 hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>Curso</th>
              <th>Ano</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="studentTable">
            <AgendamentoList service={""} date={""} time={""} url={""} status={"CONFIRMED"} />
            <AgendamentoList service={""} date={""} time={""} url={""} status={"CANCELLED"} />
            <AgendamentoList service={""} date={""} time={""} url={""} status={"PENDING"} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
