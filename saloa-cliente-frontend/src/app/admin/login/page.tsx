import { SigninFormAdmin } from "@/components/admin/auth/signinFormAdmin";
import { Logo } from "@/components/ui/logo";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto mt-10 md:mt-15 px-6">
      <div className="flex justify-between items-start">
        <Logo size={70} />
        <SwitchTheme hideLabel />
      </div>
      <h1 className="mt-0 md:mt-3 text-2xl ">
        Entre na sua conta de administrador
      </h1>
      <span className="text-gray-400">Para gerenciar a o sistema </span>
      <div className=" mt-9 mb-14 flex flex-col gap-4">
        <SigninFormAdmin />
      </div>
    </div>
  );
}
