import { Notification } from "@/types/notification";
import { formatRelativeTime } from "@/utils/format-ralative";
import { Avatar } from "../comments/avatar";

type Props = {
  notification: Notification;
};

export default function Notificationitem({ notification }: Props) {
  return (
    <div className="cursor-pointer block relative transition-all duration-150">
      <div className="hover:bg-gray-600/10 rounded-lg p-2  flex items-center justify-between w-full gap-1.5">
        <div className="flex items-start gap-2">
          <Avatar src={notification.sender?.image || "/logoDark.png"} />
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-sm font-medium ">
                {notification.sender?.nome || "JMC"}
              </p>
              <span className="flex items-center gap-1.5 mb-1.5">
                <p className="text-xs text-yellow-500 lowercase">
                  {notification.sender?.role || "Sistema"}
                </p>
                <p className="vbg size-1.5 rounded-full" />
                <p className="text-xs text-gray-500">
                  {formatRelativeTime(notification.createdAt)}
                </p>
              </span>
            </div>

            <p className="text-sm md:text-justify">{notification.message}</p>
          </div>
        </div>
        <div className="hidden">
          <div className="size-2.5 p-0.5 bg-green-600 rounded-full"></div>
        </div>
      </div>

      <div className="mt-1 ml-12 h-[1px] w-full vbg opacity-40"></div>
    </div>
  );
}
