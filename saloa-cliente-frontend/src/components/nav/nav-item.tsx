"use client";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  label: string;
  icon: IconDefinition;
  href: string;
  active?: boolean;
};
export const NavItem = ({ label, icon, href, active }: Props) => {
  const pathName = usePathname();
  const isMe = pathName === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-6 py-3 mt-0.5 ${
        active || isMe
          ? "opacity-100 hidden md:flex bg-neutral-400/30 backdrop-blur-xs border border-neutral-400/20 lg:bg-gray-300/15"
          : "opacity-70"
      } hover:opacity-100 hover:bg-neutral-400/20 rounded-2xl`}
    >
      <FontAwesomeIcon icon={icon} className="size-9" />
      <div className="text-lg">{label}</div>
      <span className="sr-only">{label}</span>
    </Link>
  );
};
