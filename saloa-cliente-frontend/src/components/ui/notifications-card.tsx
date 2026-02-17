import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function NotifationsCard() {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <div className="relative">
      <div
        className=" cursor-pointer relative"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faBell} size="2x" className="text-amber-400" />
        <div
          className="absolute rounded-full size-5 items-center justify-center flex
           text-center p-0.5 text-[12px] bg-red-500 -top-1.5 -right-1.5 text-white font-bold"
        >
          10
        </div>
      </div>
      <div className="relative">
        {showMenu && (
          <div className="bg absolute z-30 min-h-[500px] min-w-sm top-0 right-0 shadow shadow-black mt-1 rounded-xl ">
            <div className="px-2 py-1 border-b">
              <h3 className="text-lg font-medium">Notificações</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
