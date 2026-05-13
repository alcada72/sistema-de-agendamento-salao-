import FristFavorite from "@/components/home/meu-favorito";
import ProfissionalHome from "@/components/home/profissionais-home";
import Proximoagendamento from "@/components/home/proximo-agendamento";
import ServicosHome from "@/components/home/servicos-home";
import Subheader from "@/components/home/sub-header";
import { Header } from "@/components/ui/header";

export const dynamic = 'force-dynamic';
export default async function Home() {
  return (
    <div className="w-full mb-7">
      <Header hiddenBorder />
      <Subheader />
      <Proximoagendamento />
      <FristFavorite />
      <ServicosHome />
      <ProfissionalHome />
    </div>
  );
}
