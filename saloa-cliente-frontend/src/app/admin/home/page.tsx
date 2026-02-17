import CardPainelArea from "@/components/admin/home/card_painel_area";
import MainHome from "@/components/admin/home/main";
import { Header } from "@/components/ui/header";
import { pingAdmin } from "@/services/admin/server/user.service";
import { redirect } from "next/navigation";

export default async function Page() {
  const loged= await pingAdmin()
  if (!loged) {
    redirect('/admin/login')
  }
  return (
    <div className="py-0 px-2">
      <Header showIconNotify hiddenBorder  />
      <CardPainelArea />
      <MainHome />
    </div>
  );
}
