"use client";
import { GetOtherServicesNotId } from "@/services/servico.service";
import { service } from "@/types/servicos";
import { useEffect, useState } from "react";
import { CardService } from "../ui/card-service";

export default function Otherservices({ id }: { id: string }) {
  const [serviceOthers, setserviceOthers] = useState<service[]>([]);

  async function handleInforService() {
    try {
      const resServices = await GetOtherServicesNotId(id as string);
      setserviceOthers(resServices);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleInforService();
  }, [id]);

  if (serviceOthers.length === 0) {
    return (
      <div className="w-full">
        <p className="font-light text-center">
          Não temos mais serviços como este.
        </p>
      </div>
    );
  }
  return (
    <>
      {serviceOthers.map((s) => (
        <CardService key={s.id} service={s} />
      ))}
    </>
  );
}
