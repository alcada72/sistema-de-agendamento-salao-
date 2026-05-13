"use client";

import { clearAuthProf } from "@/utils/auth.prof";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
type Props = {
  hiddenLabel?: boolean;
};
export const NavLogoutProf = ({ hiddenLabel }: Props) => {
  const router = useRouter();

  const handleClick = async () => {
    if (!confirm("Deseja Sair?")) return;
    await clearAuthProf();
    router.replace("/admin/login");
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex items-center gap-6 py-3 opacity-70 hover:scale-100  hover:opacity-100`}
    >
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        className="size-6 text-red-700"
      />
      {!hiddenLabel && <div className="font-sans font-semibold">Sair</div>}
    </div>
  );
};
