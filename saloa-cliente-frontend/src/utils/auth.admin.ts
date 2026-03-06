import nookies from "nookies";

//KEYS ADMIN
export const TOKEN_KEY_ADMIN = "app@auth@admin";
export const ID_KEY_ADMIN = "app@AdminId";

//DATA ADMIN
export const saveAuthAdmin = (token: string, id: string, ctx: any = null) => {
  nookies.set(ctx, TOKEN_KEY_ADMIN, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });

  nookies.set(ctx, ID_KEY_ADMIN, id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });
};

export const getTokenAdmin = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[TOKEN_KEY_ADMIN] || null;
};

export const getIDAdmin = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[ID_KEY_ADMIN] || null;
};

export const clearAuthAdmin = (ctx: any = null) => {
  nookies.destroy(ctx, TOKEN_KEY_ADMIN, { path: "/" });
  nookies.destroy(ctx, ID_KEY_ADMIN, { path: "/" });
};
