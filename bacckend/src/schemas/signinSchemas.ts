import z from "zod";

export const SigninSchemas = z.object({
  credencial: z.string({ message: 'E-mail ou telefone obrigatorio' }).min(5, 'Minimo 5 caractares'),
  password: z.string({ message: 'password obrigatorio' }).min(6, 'Minimo 6 caracteres')
})