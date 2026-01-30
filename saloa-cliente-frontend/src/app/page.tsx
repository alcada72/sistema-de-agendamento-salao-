"use client";
import { Logo } from "@/components/ui/logo";
import { ActiveProgressIndicator } from "@/components/ui/spin";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/home");
    } else {
      router.replace("/signin");
    }
  }, []);

  return (
    <div className="min-w-full h-dvh flex flex-col items-center justify-center gap-3">
      <Logo size={100} />
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl text-nowrap font-semibold">J.M.C</span>
        <ActiveProgressIndicator />
      </div>
    </div>
  );
};
