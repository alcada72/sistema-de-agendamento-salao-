"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MenuHome } from "../home/menu-home";
import { Logo } from "./logo";
type Props = {
  title?: string;
  hiddenBorder?: boolean;
};
export const Header = ({ title, hiddenBorder }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    return () => {
      if (showMenu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
  }, [showMenu]);
  return (
    <div
      className={`flex items-center justify-between  w-full 
    ${!hiddenBorder && "border-b-1 border-b-gray-900"}  p-2`}
    >
      <div className="sflex items-center">
        <div className="lg:hidden flex">
          <Logo size={40} />
        </div>

        <div className="text-3xl font-semibold select-none hidden lg:flex">
          Buta Cortes
        </div>
      </div>
      <div className="flex-1 w-full text-2xl flex items-center justify-center font-medium select-none ">
        <span> {title} </span>
      </div>
      <div
        className="lg:hidden cursor-pointer"
        onClick={() => setShowMenu(true)}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
      {showMenu && <MenuHome activeMenu={() => setShowMenu(false)} />}
    </div>
  );
};
