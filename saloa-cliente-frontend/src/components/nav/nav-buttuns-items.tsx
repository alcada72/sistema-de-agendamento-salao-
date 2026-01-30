"use client";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  activeBottom?: () => void;
  icon: IconDefinition;
  sr_only: string;
};

export const NavButtonsItems = ({ activeBottom, icon, sr_only }: Props) => {
  return (
    <div onClick={activeBottom} className="flex items-center justify-center">
      <FontAwesomeIcon icon={icon} className="size-7" />
      <span className="sr-only">{sr_only}</span>
    </div>
  );
};
