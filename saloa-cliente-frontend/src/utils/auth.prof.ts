import nookies from "nookies";

//KEYS PROFICIONAIS
export const TOKEN_KEY_PROF = "app@auth@prof";
export const ID_KEY_PROF = "app@profId";

//DATA PROFICIONAIS
export const saveAuthProf = (token: string, id: string, ctx: any = null) => {
  nookies.set(ctx, TOKEN_KEY_PROF, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });

  nookies.set(ctx, ID_KEY_PROF, id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });
};

export const getTokenProf = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[TOKEN_KEY_PROF] || null;
};

export const getIdProf = (ctx: any = null): string | null => {
  const cookies = nookies.get(ctx);
  return cookies[ID_KEY_PROF] || null;
};

export const clearAuthProf = (ctx: any = null) => {
  nookies.destroy(ctx, TOKEN_KEY_PROF, { path: "/" });
  nookies.destroy(ctx, ID_KEY_PROF, { path: "/" });
};
