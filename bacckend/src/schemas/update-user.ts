import { z } from "zod";

export const upDateUserSchema = z.object({
  nome: z.string({ error: "nome Obrigatório" }).min(10, "Minimo 6 caractres"),
  email: z.email({ error: "E-mail Obrigatório" }),
  image: z.string().optional(),
  telefone: z.string().min(9, "pelo menos 9 numeros").optional()
});

export const updatePasswordSchema = z.object({
  password: z.string({ error: "Password Obrigatório" }).min(6, "No minimo 6 caractares"),
  confirmPassword: z.string({ error: "Confirmar Password Obrigatório" }).min(6, "No minimo 6 caractares")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
});