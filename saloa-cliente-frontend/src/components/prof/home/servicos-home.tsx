import { GetServicesLimitedServer } from "@/services/server/service-server.service";
import Link from "next/link";
import { CardService } from "../ui/card-service";

export default async function ServicosHome() {
  const service = await GetServicesLimitedServer();

  if (!service || service.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Serviços Disponiveis</h2>
        <Link href={"/home/services"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div
        className="flex w-full max-w- items-center
       gap-3 overflow-y-hidden overflow-x-auto px-4 hide-scroobar"
      >
        {service.map((s) => (
          <CardService key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}
