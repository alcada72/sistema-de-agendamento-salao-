import nookies from "nookies";

//KEYS USER
export const TOKEN_KEY_USER = "app@auth";
export const ID_KEY_USER = "app@userId";

export const saveAuth = (token: string, id: string, ctx: any = null) => {
  nookies.set(ctx, TOKEN_KEY_USER, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });

  nookies.set(ctx, ID_KEY_USER, id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });
};

export const getToken = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[TOKEN_KEY_USER] || null;
};

export const getID = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[ID_KEY_USER] || null;
};

export const clearAuth = (ctx: any = null) => {
  nookies.destroy(ctx, TOKEN_KEY_USER, { path: "/" });
  nookies.destroy(ctx, ID_KEY_USER, { path: "/" });
};
