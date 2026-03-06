import z from "zod";

export const ConfirmEmailSchema = z.object({
  token: z
    .string({ message: "Token de confirmação é obrigatório" })
    .min(6, "O token deve ter pelo menos 6 caracteres"),
});
