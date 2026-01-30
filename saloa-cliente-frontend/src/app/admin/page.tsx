import CardPainelArea from "@/components/admin/home/card_painel_area";
import MainHome from "@/components/admin/home/main";
import { Header } from "@/components/ui/header";

export default function Page() {
  return (
    <div className="py-0 px-2">
      <Header hiddenBorder  />
      <CardPainelArea />
      <MainHome />
    </div>
  );
}
