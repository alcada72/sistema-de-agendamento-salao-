"use client";
import { AgendamentoModal } from "@/components/agendamento/AgendamentoModal";
import Otherservices from "@/components/servicos/other-services";
import { ServiceIdSkaleton } from "@/components/servicos/servicos-id-skaleton";
import { Button } from "@/components/ui/button";
import CardFuncionario from "@/components/ui/card_funcionarios";
import { GetAllServicesById } from "@/services/servico.service";
import { service } from "@/types/servicos";
import { formatDuration } from "@/utils/formateDuration";
import { FormatPrice } from "@/utils/formatePrice";
import {
  faChevronLeft,
  faChevronRight,
  faShare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: Props) {
  const { id } = use(params);

  const Router = useRouter();
  const [adore, setAdore] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [service, setservice] = useState<service | null>(null);
  const [cover, setcover] = useState(0);

  useEffect(() => {
    return () => {
      if (showmodal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
  }, [showmodal]);

  async function handleInforService() {
    try {
      const result = await GetAllServicesById(id);
      setservice(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleInforService();
  }, [id]);

  if (!service) {
    return <ServiceIdSkaleton />;
  }

  const nextImage = () => {
    if (cover < service.images.length - 1) {
      setcover((prev) => prev + 1);
    } else {
      setcover(0);
    }
  };

  const prevImage = () => {
    if (cover > 0) {
      setcover((prev) => prev - 1);
    } else {
      setcover(service.images.length - 1);
    }
  };

  const thumbnail = service.images && service.images[cover].url;

  return (
    <>
      <div className="lg:max-w-full max-w-screen flex flex-col md:grid grid-cols-2 relative ">
        <div className="relative border-b-2 border-b-gray-400">
          <div
            className="overflow-hidden  h-96 mt-12 md:mt-0 md:size-full 
           md:rounded-sm aspect-auto md:aspect-square"
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Corte Masculino"
                className="object-cover size-full aspect-video"
              />
            )}
          </div>

          <section
            className="fixed md:absolute z-50 top-0  flex bg-neutral-400/30 
          backdrop-blur-[3px] border-b border-b-neutral-300/30 
          items-center justify-between px-2 py-2 w-full"
          >
            <button
              className="rounded-full p-1 bg"
              onClick={() => Router.back()}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="size-6 font-bold"
              />
            </button>
            <span
              className="text-center font-bold text-xl 
            overflow-hidden whitespace-nowrap text-ellipsis w-[70%] "
            >
              {service?.nome}
            </span>
            <nav>
              <span
                className="rounded-full size-6 bg p-1 mr-2 bg cursor-pointer"
                onClick={() => setAdore(!adore)}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className={`size-6  ${adore && "text-yellow-500"}`}
                />
              </span>
              <span className="rounded-full size-6 bg p-1">
                <FontAwesomeIcon icon={faShare} className={"size-6"} />
              </span>
            </nav>
          </section>

          <section
            className={` ${
              service.images.length == 1 ? "hidden" : "flex "
            } absolute bottom-[1px]  left-0 w-full
           items-center justify-center z-20`}
          >
            <div
              className="flex flex-row gap-2.5  bg-neutral-400/30 
          backdrop-blur-[1px] p-2 items-center justify-center rounded-2xl"
            >
              {service.images &&
                service.images.map((m, i) => (
                  <div
                    key={i}
                    onClick={() => setcover(i)}
                    className={` ${
                      cover === i && "border-2 border-blue-900 scale-110"
                    }    flex-1 overflow-hidden rounded-sm size-12 max-w-12
                         flex items-center justify-center
                         border-2  transition-all`}
                  >
                    <img
                      src={m.url}
                      alt={service.description}
                      draggable={false}
                      loading="lazy"
                      crossOrigin="anonymous"
                      className="size-full object-cover transition-all"
                    />
                  </div>
                ))}
            </div>
          </section>

          <section
            className={`${
              service.images.length == 1 ? "hidden" : "flex "
            } absolute inset-0  items-center justify-between z-10 px-1`}
          >
            <div className=" h-full items-center flex">
              <button
                className="rounded-full p-3 bg-neutral-400/20 
          backdrop-blur-[1px] items-center flex"
                onClick={prevImage}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-lg font-extrabold text-gray-950"
                />
              </button>
            </div>

            <div className=" h-full items-center flex">
              <button
                className="rounded-full p-3 bg-neutral-400/20 
          backdrop-blur-[1px] items-center flex"
                onClick={nextImage}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-lg font-extrabold text-gray-950"
                />
              </button>
            </div>
          </section>
        </div>
        <div className="flex-1 bg bottom-0 p-2 size-full z-40 md:mt-0  lg:h-full overflow-hidden overflow-y-auto hide-scroobar border-b-2 border-b-gray-900 ">
          <div className="p-1 h-full ">
            <div className="flex justify-between items-center mb-1">
              <span className="flex-1 truncate text-lg max-w-full font-bold">
                {service?.nome}
              </span>
              <span className="block truncate text-sm font-semibold">
                10
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-amber-300 text-sm"
                />
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex-1 flex flex-col truncate text-sm max-w-full justify-center">
                <span className="text-[15px] text-gray-500">Preço</span>
                <span className="text-amber-300 text-lg">
                  {FormatPrice(service?.price as number)}
                </span>
              </span>
              <span className="truncate text-sm flex flex-col justify-center">
                <span className="text-[15px] text-gray-500">Duração</span>
                <span className="text-lg">
                  {formatDuration(service.duration as number)}
                </span>
              </span>
            </div>
            <div className="mt-2 text-justify text-base">
              <span className="text-justify">{service?.description}</span>
            </div>
            <div className="w-screen lg:max-w-full max-w-screen mt-5">
              <span className="text-sm font-bold">
                Profissionais Disponivel para o serviço
              </span>
              <section
                className="overflow-x-auto hide-scroobar mr-4  lg:max-w-full 
              max-w-screen  overflow-hidden flex items-center justify-start py-2 px-1
               shrink-0 scroll-smooth"
              >
                <CardFuncionario
                  user={service.professional}
                />
              </section>
            </div>
            <div className="mt-10 mb-5">
              <Button
                label={"AGENDAR"}
                size={3}
                onClick={() => setshowmodal(true)}
              />
            </div>
          </div>
        </div>
        <section className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Serviços Disponiveis</h2>

          <p onClick={() => Router.back()}>Ver mais</p>
        </section>
      </div>
      <div className="shrink-0 grid grid-cols-2 md:grid-cols-4 gap-2 flex-1 p-2">
        <Otherservices id={service.id} />
      </div>

      {showmodal && (
        <AgendamentoModal
          onClose={function (): void {
            setshowmodal(false);
          }}
          serviceId={service.id}
        />
      )}
    </>
  );
}
