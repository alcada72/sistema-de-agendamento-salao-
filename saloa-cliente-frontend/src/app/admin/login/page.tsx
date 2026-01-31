import { Logo } from "@/components/ui/logo";
import SwitchTheme from "@/components/ui/SwitchTheme";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto mt-10 md:mt-15 px-6">
      <div className="flex justify-between items-start">
        <Logo size={70} />
        <SwitchTheme hideLabel />
      </div>
      <h1 className="mt-0 md:mt-3 text-2xl ">Entre na sua conta</h1>
      <span className="text-gray-400">Para o acesso total no App.</span>
      <div className=" mt-9 mb-14 flex flex-col gap-4">
        
      </div>
      <div className="flex flex-col justify-center items-center gap-1 md:flex-row">
        <div className="text-gray-400">Ainda não tem uma conta?</div>
        <Link className="hover:underline hover:text-blue-400" href="/signup">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
