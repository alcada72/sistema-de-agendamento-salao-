import CardPainelAreaPof from "@/components/prof/home/card_painel_area";
import ProximosagendamentosProf from "@/components/prof/home/proximo-agendamento";
import SubheaderProf from "@/components/prof/home/sub-header-prof";
import { Header } from "@/components/ui/header";
export const dynamic = 'force-dynamic';
export default async function Home() {
  return (
    <div className="w-full mb-7">
      <Header hiddenBorder showIconNotify />
      <SubheaderProf />
      <CardPainelAreaPof/>
      <ProximosagendamentosProf />
    </div>
  );
}
