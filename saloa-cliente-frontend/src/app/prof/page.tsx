import { Logo } from "@/components/ui/logo";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import { pingAdmin } from "@/services/admin/server/user.service";
import { pingProf } from "@/services/prof/server/user.service";
import { redirect } from "next/navigation";

export default async function Page() {
  const loged = await pingProf();
  if (!loged) {
    redirect("/prof/login");
  } else {
    redirect("prof/home");
  }
}
