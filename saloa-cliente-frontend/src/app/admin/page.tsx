import { Logo } from "@/components/ui/logo";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import { pingAdmin } from "@/services/admin/server/user.service";
import { redirect } from "next/navigation";

export default async function Page() {
  const loged = await pingAdmin();
  if (!loged) {
    redirect("/admin/login");
  } else {
    redirect("admin/home");
  }

  return (
    <div className="min-w-full h-dvh flex flex-col items-center justify-center gap-3">
      <Logo size={100} />
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl text-nowrap font-semibold">J.M.C</span>
        <ActiveProgressIndicator />
      </div>
    </div>
  );
}
