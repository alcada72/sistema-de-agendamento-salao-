"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  size: number;
};

export const Logo = ({ size }: Props) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Link href="/">
      <Image
        src={currentTheme === "dark" ? "/logoLight.png" : "/logoDark.png"}
        width={size}
        height={size}
        alt="logo"
      />
    </Link>
  );
};
