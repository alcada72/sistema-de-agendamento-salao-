"use client";
import { getNotificattionsAdmin } from "@/services/admin/notification.service";
import { getNotificattions } from "@/services/notification.service";
import { Notification } from "@/types/notification";
import { formatCountMax } from "@/utils/format-Count";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React from "react";
import { GeneralHeader } from "../ui/general-header";
import SwitchTheme from "../ui/SwitchTheme";
import Notificationitem from "./notification-item";

export default function NotifationsCard() {
  const router = usePathname();
  const isAdmin = router.startsWith("/admin");
  const [showMenu, setShowMenu] = React.useState(false);
  const [notifications, setNotification] = React.useState<Notification[]>([]);

  const getMyNotificstions = async () => {
    try {
      const response = isAdmin
        ? await getNotificattionsAdmin()
        : await getNotificattions();

      if (response) {
        setNotification(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getMyNotificstions();
    return () => {
      getMyNotificstions();
    };
  }, []);

  return (
    <div className="relative transition-all duration-150">
      {/* =====================================
          Botão do sininho
       ========================================
      */}
      <div
        className=" cursor-pointer relative"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faBell} size="2x" className="text-amber-400" />

        {notifications.length !== 0 && (
          <div
            className="absolute rounded-full size-5 items-center justify-center flex
           text-center p-0.5 text-[12px] bg-red-500 -top-1.5 -right-1.5 text-white font-bold"
          >
            {formatCountMax(notifications.length, 20)}
          </div>
        )}
      </div>

      {/* =====================================
          modal de notificacoes
       ========================================
      */}

      <div className="relative">
        {showMenu && (
          <div className="bg fixed md:absolute z-30 md:min-h-[600px] md:max-h-1/2 max-h-full md:min-w-sm size-full top-0 right-0 shadow md:shadow-black md:mt-1 border border-neutral-300/30 md:rounded-xl transition-all duration-150 overflow-hidden ">
            <div className="px-2 hidden py-1 border-b md:flex justify-between items-center ">
              <h3 className="text-lg font-medium">Notificações</h3>
            </div>

            <div className="md:hidden">
              <GeneralHeader hiddenBack>
                <div className="flex md:hidden justify-between items-center gap-4 mt-4 md:mt-0">
                  <div className="flex flex-col w-full flex-1">
                    <section>
                      <h1 className="text-3xl font-bold ">Notificações</h1>
                    </section>
                    <div>
                      <span className="text-gray-400">
                        Visualiza as tuas notificaçoes
                      </span>
                    </div>
                  </div>
                  <SwitchTheme hideLabel />
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex justify-center
                        cursor-pointer items-center border-2 border-red-700 size-10 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faX}
                      className="size-6 iconcolor text-red-700"
                    />
                  </button>
                </div>
              </GeneralHeader>
            </div>

            <div className="flex flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden h-10/12 md:h-11/12 noScroll hide-scroobar">
            { notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 mt-10">
                <FontAwesomeIcon icon={faBell} size="3x" className="text-gray-400" />
                <p className="text-gray-400 text-sm">Sem notificações</p>
              </div>
            )}

              {notifications.map((n) => (
                <Notificationitem key={n.id} notification={n} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
