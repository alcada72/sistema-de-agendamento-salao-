import z from "zod";

export const servicosSchema = z.object({
  nome: z.string({ message: 'Nome do serviço obrigatorio' }).min(3, 'Minimo 3 caractares'),
  description: z.string({ message: 'Descrição do serviço obrigatorio' }).min(10, 'Minimo 10 caractares'),
  duration: z.string({ message: 'Duração obrigatoria' }),
  price: z.string({ message: 'Preço obrigatorio' }),
  professionalId: z.string({ message: 'Profissional obrigatorio' }).optional(),
})