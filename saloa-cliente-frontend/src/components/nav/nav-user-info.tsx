"use client";
import { getUserMeService } from "@/services/user.service";
import { User } from "@/types/user";
import { getToken } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubheaderSkeleton } from "../home/sub-header";

export const NavUserInfo = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = getToken();

    async function loadUser() {
      try {
        const response = await getUserMeService();
        if (!response) {
          redirect("/");
        }
        setUser(response);
      } catch (error) {
        console.log("Erro ao buscar usuário:", error);
      }
    }

    if (token) {
      loadUser();
    } else {
      redirect("/");
    }
  }, []);

  if (!user) {
    return <SubheaderSkeleton />;
  }

  return (
    <div className="flex items-center">
      <div className="size-10 mr-2 rounded-full overflow-hidden">
        <Link href="/profile">
          <img
            src={user.image}
            alt={user.nome}
            className="size-full object-cover"
            crossOrigin="anonymous"
          />
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <Link className="block truncate" href="/profile">
          {user.nome}
        </Link>
        <div className="truncate text-sm text-gray-400">{user.email}</div>
      </div>
    </div>
  );
};
