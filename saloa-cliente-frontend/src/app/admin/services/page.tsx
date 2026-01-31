"use client";
import ModalCreateServices from "@/components/admin/sevicos/modalCreateServices";
import BarAddInput from "@/components/admin/ui/barAddInput";
import { CardService } from "@/components/ui/card-service";
import { Header } from "@/components/ui/header";
import { GetAllServices } from "@/services/servico.service";
import { service } from "@/types/servicos";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Page() {
  const [service, setservice] = useState<service[]>([]);
  const [showModal, setshowModal] = useState(false);
  const [search, setsearch] = useState("");
  async function getService() {
    try {
      const result = await GetAllServices();
      const filter = result.filter((e) =>
        e.nome.includes(search?.toLocaleLowerCase()),
      );
      setservice(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getService();
  }, []);

  const filter = service.filter((e) =>
    e.nome.toLocaleLowerCase().includes(search),
  );

  return (
    <>
      <Header />
      <div className="px-2">
        <BarAddInput
          placeholder="Pesquisar serviços"
          icon={faSearch}
          title="Os nossos serviços"
          onChange={(e) => setsearch(e)}
          value={search}
          onAdd={() => setshowModal(true)}
        />

        <div className="shrink-0 grid grid-cols-2 md:grid-cols-7 md:gap-3 gap-2 flex-1 p-2 mt-3">
          {filter.map((s) => (
            <CardService key={s.id} service={s} />
          ))}
        </div>
        {filter.length <= 0 && (
          <p className="text-2xl font-semibold text-gray-500 w">
            Nenhum resultado encontrado
          </p>
        )}
      </div>

      <ModalCreateServices
        roalond={() => getService()}
        mostar={showModal}
        show={() => setshowModal(!showModal)}
      />
    </>
  );
}
