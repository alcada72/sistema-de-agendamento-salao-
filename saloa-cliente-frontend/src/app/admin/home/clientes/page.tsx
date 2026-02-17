import BarAddInput from "@/components/admin/ui/barAddInput";
import { HardFuncionarioCard } from "@/components/ui/card-funcionario-hard";
import { Header } from "@/components/ui/header";
import { GetClientesLimitedServer } from "@/services/server/service-server.service";

export default async function page() {
  const service = await GetClientesLimitedServer();

  if (!service || service.length === 0) {
    return (
      <>
        <Header />
        <div className="p-4 text-center w-full">
          <p className="text-2xl">
            O Sistema ainda não tem clientes cadastrados
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="px-2">
        <BarAddInput
          placeholder="Pesquisar funcionarios"
          title="Nossos clientes"
          noButton
        />
        <div className="shrink-0 grid grid-cols-2 md:grid-cols-7 md:gap-3 gap-2 flex-1 p-2 mt-3 ">
          {service.map((c) => (
            <HardFuncionarioCard user={c} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
}
