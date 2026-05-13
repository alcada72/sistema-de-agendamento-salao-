import { pingAdmin } from "@/services/admin/server/user.service";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';
export default async function Page() {
  const loged = await pingAdmin();
  if (!loged) {
    redirect("/admin/login");
  } else {
    redirect("admin/home");
  }
}
