"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import React from "react";
import { NavButtonsItems } from "../nav/nav-buttuns-items";

type Props = {
  flex?: boolean;
  hideLabel?: boolean;
};
export default function SwitchTheme({ flex, hideLabel }: Props) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`flex ${
        !flex && "flex-col"
      } items-center gap-2 cursor-pointer select-none`}
    >
      <NavButtonsItems
        activeBottom={() => setTheme(theme === "dark" ? "light" : "dark")}
        icon={theme === "dark" ? faMoon : faSun}
        sr_only={"Configurações"}
      />
      {!hideLabel &&
        (theme === "dark" ? <span>Escuro</span> : <span>Claro</span>)}
    </div>
  );
}
