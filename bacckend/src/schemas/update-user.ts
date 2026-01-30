import { z } from "zod";

export const upDateUserSchema = z.object({
  nome: z.string({ error: "nome Obrigatório" }).min(10, "Minimo 6 caractres"),
  email: z.email({ error: "E-mail Obrigatório" }),
  password: z.string({ error: "Password Obrigatório" }).min(6, "No minimo 6 caractares"),
  telefone: z.string().min(9, "pelo menos 9 numeros").optional()
});
