// utils/auth-server.ts
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { ID_KEY_USER, TOKEN_KEY_USER } from "./auth";

export const getAuthFromRequest = (req: IncomingMessage) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[TOKEN_KEY_USER] || null;
  const slug = cookies[ID_KEY_USER] || null;
  return { token, slug };
};
