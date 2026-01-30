import { Header } from "@/components/ui/header";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function page() {
  return (
    <div className="lg:hidden flex-col h-dvh ">
      <Header />
      <div>
        <div className="flex items-center justify-between border-b border-gray-800 py-2 px-3">
          <span className="text-lg font-semibold select-none">Trocar o Tema</span>
          <SwitchTheme />
        </div>
      </div>
    </div>
  );
}
