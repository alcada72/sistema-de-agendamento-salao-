import { GetProfissionaisLimitedServer } from "@/services/server/service-server.service";
import Link from "next/link";
import { HardFuncionarioCard } from "../ui/card-funcionario-hard";

export default async function ProfissionalHome() {
  const service = await GetProfissionaisLimitedServer();
  if (!service || service.length === 0) {
        return (
      <div className="p-4 text-center w-full">
        <p>Sem próximos agendamentos</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Conheça os barbeiros</h2>
        <Link href={"/home/services"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div
        className="flex w-full max-w- items-center
       gap-3 overflow-y-hidden overflow-x-auto px-4 hide-scroobar"
      >
        {service.map((p) => (
          <HardFuncionarioCard key={p.id} user={p} />
        ))}
      </div>
    </div>
  );
}
