import ProfissionalHome from "@/components/home/profissionais-home";
import Proximoagendamento from "@/components/home/proximo-agendamento";
import ServicosHome from "@/components/home/servicos-home";
import Subheader from "@/components/home/sub-header";
import { Header } from "@/components/ui/header";

export default async function Home() {
  return (
    <div className="w-full">
      <Header hiddenBorder />
      <Subheader />
      <Proximoagendamento />
      <ServicosHome />
      <ProfissionalHome />
    </div>
  );
}
