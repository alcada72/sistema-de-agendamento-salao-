"use client";

import { Button } from "@/components/ui/button";
import CardFuncionario from "@/components/ui/card_funcionarios";
import { Input } from "@/components/ui/input";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
type Props = {
  mostar: boolean;
  show: () => void;
  roalond: () => void;
};

export default function ModalCreateServices({ show, mostar,roalond }: Props) {
  const [preview, setPreview] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;
    const selectFile = Array.from(file);
    const views = selectFile.map((img) => URL.createObjectURL(img));
    setPreview(views);
  };

  const handleCreateService = () => {
    setPreview([]);
    show();
    roalond()
  };

  const HandleCancel = () => {
    setPreview([]);
    show();
  };
  return (
    <div
      className={`
        ${!mostar ? "hidden" : "flex"}
      fixed inset-0   bg-black/40 
          backdrop-blur-[2px] items-center justify-center z-50 size-full
      `}
    >
      <section className="vbg p-5 size-10/12 rounded-2xl grid grid-cols-2  overflow-hidden">
        {preview.length > 0 ? (
          <div>
            <header className="mb-2.5 w-10/12 flex justify-between items-center">
              <span className="text-2xl font-medium ">
                {preview.length}-Images selecionadas
              </span>
              <button
                title="Adcionar mais fotos"
                className="outline-0 border-0 bg-transparent text-green-800 text-3xl cursor-pointer"
              >
                +
              </button>
            </header>
            <div
              className="grid grid-cols-2 gap-2.5 overflow-x-hidden h-full overflow-y-auto 
            "
            >
              {preview.map((imag, i) => (
                <img
                  src={imag}
                  key={i}
                  alt="prvi"
                  className=" size-52 object-cover rounded-sm"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="size-full flex items-center justify-center">
            <div className=" w-90 h-90 flex items-center justify-center rounded-2xl bg-gray-600">
              <div
                className="size-10/12  border-dashed border-2 rounded-2xl
           border-neutral-300/30 flex flex-col items-center justify-center
            relative cursor-pointer overflow-hidden text-neutral-300"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  maxLength={5}
                  required
                  max={5}
                  className="text-gray-600 absolute inset-0 size-full z-20 cursor-pointer "
                />
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-green-800"
                  size="5x"
                />
                <span className="text-neutral-300">
                  selecionar images maximo 5
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 border-l overflow-x-hidden overflow-y-auto max-h-11/12/12">
          <div className="m-2 w-full">
            <h2 className="text-2xl font-semibold uppercase text-center">
              Criar Serviço
            </h2>
          </div>
          <form className="w-full flex flex-col items-center mt-7 gap-2  px-4 hide-scroobar">
            <span className="flex flex-col w-9/12">
              <label className="text-lg ml-2 opacity-60">
                Nome do Serviço *
              </label>
              <div className="border border-gray-600 rounded-2xl">
                <Input placeholder="nome do serviço" filled />
              </div>
            </span>

            <span className="flex flex-col w-9/12">
              <label htmlFor="descricao" className="text-lg ml-2 opacity-60">
                Descrição do Serviço *
              </label>
              <div className="border border-gray-600 rounded-2xl bg-gray-700">
                <textarea
                  rows={5}
                  className="flex-1 hide-scroobar w-full outline-none bg-transparent h-full px-4 text-justify  placeholder-gray-400 "
                  role="none"
                  name="descricao"
                  id="descricao"
                  placeholder="Descreva o produto com detalhes minunciosos"
                />
              </div>
            </span>

            <div className="flex gap-2 w-9/12">
              <span className="flex flex-col w-full">
                <label className="text-lg ml-2 opacity-60">
                  Preço do Serviço *
                </label>
                <div className="border border-gray-600 rounded-2xl">
                  <Input placeholder="Preço ex.: 1500" filled />
                </div>
              </span>
              <span className="flex flex-col w-full">
                <label htmlFor="duracao" className="text-lg ml-2 opacity-60">
                  Duração do Serviço *
                </label>
                <div
                  className={`borda flex items-center h-14 overflow-hidden rounded-2xl border-2 transition-colors 
                     bg-gray-700 border-gray-700 
                   `}
                >
                  <select
                    name="duracao"
                    id="duracao"
                    className="flex-1 bg-gray-700 outline-none  h-full px-4 text-gray-200  placeholder-gray-200  b"
                  >
                    <option disabled>escolha a duração</option>
                    <option value={"10"}>10 min</option>
                    <option value={"15"}>15 min</option>
                    <option value={"20"}>20 min</option>
                    <option value={"25"}>25 min</option>
                    <option value={"30"}>30 min</option>
                    <option value={"35"}>35 min</option>
                    <option value={"40"}>40 min</option>
                    <option value={"45"}>45 min</option>
                    <option value={"50"}>50 min</option>
                    <option value={"55"}>55 min</option>
                    <option value={"60"}>60 min</option>
                  </select>
                </div>
              </span>
            </div>
            <div
              className="flex w-full max-w-9/12 items-center
                  gap-3 overflow-y-hidden overflow-x-scroll px-4 hide-scroobar noScroll"
            >
              {[1, 2, 3].map((_, i) => (
                <CardFuncionario key={i} />
              ))}
            </div>
            <div className="w-9/12 mt-2.5">
              <Button
                vbg
                label={"criar serviço"}
                size={1}
                onClick={handleCreateService}
                uppercase
              />
              <p
                className="text-lg mt-2.5 opacity-80 hover:opacity-100 text-red-700 text-center w-full flex-1 cursor-pointer"
                onClick={HandleCancel}
              >
                cancelar
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
