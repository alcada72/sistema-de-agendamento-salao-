import { CardService } from "@/components/ui/card-service";
import { Header } from "@/components/ui/header";
import { GetAllServices } from "@/services/servico.service";

export default async function Page() {
  const result = await GetAllServices();
  return (
    <div className="flex flex-col w-full">
      <Header title="Serviços" />

      <div className="shrink-0 grid grid-cols-2 md:grid-cols-4 md:gap-3 gap-2 flex-1 p-2">
        {result.map((s) => (
          <CardService key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}
