"use client";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
type Props = {
  label: string;
  icon: IconDefinition;
  href: string;
  reverse?: boolean;
};
export const NavigatorBar = ({ label, icon, href, reverse }: Props) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-6 hover:bg-gray-600/15 py-3 ${reverse ? "flex-row-reverse" : ""}
         border-b border-gray-800 py-2 px-3
        justify-between `}
    >
      <FontAwesomeIcon icon={icon} className="size-10" />
      <div className="text-lg font-light">{label}</div>
      <span className="sr-only">{label}</span>
    </Link>
  );
};
