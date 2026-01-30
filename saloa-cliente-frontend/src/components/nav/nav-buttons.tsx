"use client";
import { faCalendar, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { NavButtonsItems } from "./nav-buttuns-items";

export const NavButtons = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-start gap-2  cursor-pointer">
        <NavButtonsItems
          activeBottom={() => setTheme(theme === "dark" ? "light" : "dark")}
          icon={theme === "dark" ? faSun : faMoon}
          sr_only={"Configurações"}
        />
        {theme === "dark" ? <span>Escuro</span> : <span>Claro</span> }
      </div>
      <NavButtonsItems icon={faCalendar} sr_only={"Configurações"} />
      <NavButtonsItems icon={faCalendar} sr_only={"Configurações"} />
      <NavButtonsItems icon={faCalendar} sr_only={"Configurações"} />
      <NavButtonsItems icon={faCalendar} sr_only={"Configurações"} />
    </>
  );
};
