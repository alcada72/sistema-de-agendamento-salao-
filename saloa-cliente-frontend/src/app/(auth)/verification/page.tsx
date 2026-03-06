import { ConfirmForm } from "@/components/auth/confirmForm";
import { Logo } from "@/components/ui/logo";
import ImageRigth from "@/components/ui/sideImage";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function Page() {
  return (
    <div className="flex min-h-dvh ">
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-md justify-between items-center mb-5 px-2.5 ">
          <Logo size={70} />
          <SwitchTheme hideLabel />
        </div>
        <div className="vbg p-6 rounded-2xl shadow-lg  max-h-[50%]">
          <h1 className="text-2xl font-bold text-center mb-4">
            Verificação de E-mail
          </h1>
          <p className="text-center mb-6">
            Digite o código de 6 dígitos enviado para o seu email
          </p>
          <ConfirmForm />
        </div>
      </div>
      <ImageRigth image="assets/comfirm.svg" />
    </div>
  );
}
