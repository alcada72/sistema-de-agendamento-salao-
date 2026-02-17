import CardFuncionario from "@/components/ui/card_funcionarios";
import { GetProfissionaisLimitedServer } from "@/services/server/service-server.service";
import Link from "next/link";

export default async function Profissionardashcard() {
  const funcions = await GetProfissionaisLimitedServer();
  return (
    <div className="content-card">
      <div className="w-full mb-5 items-center justify-between flex border-neutral-300 border-b-1 backdrop-blur-2xl p-1">
        <span className="text-2xl font-semibold ">Funcionarios</span>
        <Link
          href={"admin/funcionarios"}
          title="ver todos os agendametos"
          className="text-blue-500 hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {funcions &&
          funcions?.length !== 0 &&
          funcions.map((a) => <CardFuncionario user={a} key={a.id} />)}
      </div>
    </div>
  );
}
