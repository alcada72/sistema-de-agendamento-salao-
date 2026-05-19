"use client";
import BarAddInput from "@/components/admin/ui/barAddInput";
import ModalScreens from "@/components/admin/ui/modalScreens";
import { Button } from "@/components/ui/button";
import { HardFuncionarioCard } from "@/components/ui/card-funcionario-hard";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { CreateFuncionario } from "@/services/admin/auth.service";
import { GetProfissionaisLimited } from "@/services/admin/servico.service";
import { User } from "@/types/user";
import contemNumeros from "@/utils/contemNumeros";
import { useEffect, useRef, useState } from "react";

export default function page() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [service, setservice] = useState<User[] | undefined>();
  const [isloandig, setisloandig] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [search, setsearch] = useState("");

  const handleClickCamera = () => fileInput.current?.click();

  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);

    const views = URL.createObjectURL(file);
    setPreview(views);
  };

  const Getprofissionais = async () => {
    try {
      const result = await GetProfissionaisLimited();
      setservice(result);
    } catch (error) {
      console.log(error);
    }
  };

  function onClose() {
    setPreview(null);
    setEmail("");
    setNome("");
    setImage(null);
    setCategoria("");
    setTelefone("");
    setopenModal(false);
  }

  async function CreatProfissional() {
    if (!nome.trim() || !telefone.trim() || !email.trim() || !categoria)
      return alert("Prencha todos os campos");

    const haveNumber = contemNumeros(nome);

    if (haveNumber) return alert("O campo nome não pode conter numero");

    if (!image) return alert("Seleciona a imagem do funcionario");

    if (telefone.length < 9) {
      return alert("O telefone tem que ter 9 caracteres minimos");
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("telefone", telefone);
    formData.append("email", email);
    formData.append("password", "123456");
    formData.append("categoria", categoria);
    formData.append("image", image);

    try {
      setisloandig(true);
      const result = await CreateFuncionario(formData);

      if (result) {
        Getprofissionais();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloandig(false);
    }
  }

  useEffect(() => {
    Getprofissionais();
    return () => {
      Getprofissionais();
    };
  }, []);

  if (!service || service.length === 0) {
    return (
      <>
        <Header />
        <div className="p-4 text-center w-full">
          <p className="text-2xl">
            O Sistema ainda não tem funcionarios cadastrados
          </p>
        </div>
      </>
    );
  }

  const filter = service.filter((e) =>
    e.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <>
      <Header />
      <div className="px-2">
        <BarAddInput
          placeholder="Pesquisar funcionarios"
          title="Nossos funcionários"
          labelBotton="Cadastrar funcionario"
          onChange={(e) => setsearch(e)}
          value={search}
          onAdd={() => setopenModal(true)}
        />
        <div className="shrink-0 grid grid-cols-2 md:grid-cols-7 md:gap-3 gap-2 flex-1 p-2 mt-3 ">
          {filter.map((c) => (
            <HardFuncionarioCard user={c} key={c.id} />
          ))}
        </div>
      </div>

      {openModal && (
        <ModalScreens onClose={onClose}>
          <div className="grid grid-cols-2 place-items-center size-full p-2">
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="size-72 overflow-hidden rounded-full bg-gray-500/40 border border-green-800">
                <img
                  src={preview ?? "/default.png"}
                  alt="doo"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <input
                type="file"
                ref={fileInput}
                accept="image/*"
                onChange={handleFileChange}
                className=" hidden"
              />
              <button
                onClick={handleClickCamera}
                className="px-4 text-white cursor-pointer  py-2 outline-0 border-0 rounded bg-green-800"
              >
                Procurar Imagem
              </button>
            </div>

            <div className="flex-1 w-full overflow-x-auto">
              <h3 className="text-center text-2xl">Cadastrar Funcionário</h3>
              <form className="w-full flex flex-col items-center mt-7 gap-2  px-4 hide-scroobar">
                <span className="flex flex-col w-9/12">
                  <label className="text-lg ml-2 opacity-60">
                    Nome do Funcionário *
                  </label>
                  <div className="border border-gray-600 rounded-2xl text-white">
                    <Input
                      placeholder="Ex.: Aspirante Adelino"
                      filled
                      value={nome}
                      onChangeText={(texto) => setNome(texto)}
                    />
                  </div>
                </span>

                <span className="flex flex-col w-9/12">
                  <label className="text-lg ml-2 opacity-60">
                    Nº telefone do funcionário *
                  </label>
                  <div className="border border-gray-600 rounded-2xl">
                    <Input
                      placeholder="Ex.: 945724107"
                      filled
                      type="number"
                      value={telefone}
                      onChangeText={(texto) => setTelefone(texto)}
                    />
                  </div>
                </span>

                <span className="flex flex-col w-9/12">
                  <label className="text-lg ml-2 opacity-60">
                    E-mail do funcionário *
                  </label>
                  <div className="border border-gray-600 rounded-2xl">
                    <Input
                      placeholder="Ex.: exemplo@gmail.com"
                      filled
                      type="email"
                      value={email}
                      onChangeText={(texto) => setEmail(texto)}
                    />
                  </div>
                </span>

                <span className="flex flex-col w-9/12">
                  <label className="text-lg ml-2 opacity-60 flex">
                    Password do funcionário
                  </label>
                  <div className="border border-gray-600 rounded-2xl">
                    <select
                      defaultValue={""}
                      onChange={(e) => setCategoria(e.target.value)}
                      className=" border-0 outline-0 borda w-full flex items-center
                      h-10 font-semibold rounded-2xl text-lg  transition-colors"
                    >
                      <option value="" disabled>
                        Selecione uma categoria
                      </option>
                      <option value="BARBEARIA">Barbeiro</option>
                      <option value="MANICURE">Manicure</option>
                      <option value="CYBER">Cyber café</option>
                    </select>
                  </div>
                </span>

                <div className="w-9/12 mt-2.5">
                  <Button
                    vbg
                    label={"criar serviço"}
                    size={1}
                    onClick={CreatProfissional}
                    uppercase
                    disabled={isloandig}
                  />
                  <button
                    className="text-lg mt-2.5 opacity-80 hover:opacity-100 text-red-700 text-center w-full flex-1 cursor-pointer"
                    onClick={onClose}
                  >
                    cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ModalScreens>
      )}
    </>
  );
}
