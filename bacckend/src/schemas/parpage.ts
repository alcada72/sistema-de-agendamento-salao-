import z from "zod";

export const paginationSchemas = z.object({
  page: z.coerce.number().min(0).optional(),
  perPage:z.coerce.number().min(0).optional()
});
