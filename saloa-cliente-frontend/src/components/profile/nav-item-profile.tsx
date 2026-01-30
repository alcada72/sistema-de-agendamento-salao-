 "use client";
import {
  faChevronRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
type Props = {
  label: string;
  icon: IconDefinition;
  href: string;
};
export const NavItemProfile = ({ label, icon, href }: Props) => {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-6 p-3 
       opacity-90 bg-gray-400/50 hover:opacity-100 hover:bg-gray-300/40
       rounded-2xl border border-neutral-300/30`}
    >
      <div className="flex items-center gap-6 justify-center">
        <FontAwesomeIcon icon={icon} className="size-5 font-bold" size="2x" />
        <div className="text-xl font-semibold truncate">{label}</div>
        <span className="sr-only">{label}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faChevronRight} className="size-4 font-bold " size="2x" />
      </div>
    </Link>
  );
};
