import z from "zod";

export const commentSchema = z.object({
  commentText: z.string({ message: 'corpo do comentario é obrigatorio' }).min(3, 'Minimo 3 caractares')
})