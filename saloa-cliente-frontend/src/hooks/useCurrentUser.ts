"use client";
import baseURL from "@/api/baseUrl";
import { getID, getToken } from "@/utils/auth";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    const slug = getID();

    async function fetchUser() {
      try {
        const response = await fetch(baseURL +
          `/user/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600 },
          }
        );
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error("Erro ao buscar usuário logado", err);
      }
    }

    if (token && slug) fetchUser();
  }, []);

  return user;
};
