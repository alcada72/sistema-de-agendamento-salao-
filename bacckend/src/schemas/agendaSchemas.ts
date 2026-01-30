import z from "zod";

export const agendaSchemas = z.object({
  serviceId: z.string({ message: 'ID do serviço obrigatorio' }),
  professionalId: z.string({ message: 'ID do profissional obrigatorio' }),
  date: z.string({ message: 'Data do agendamento obrigatorio' }).refine((date) => !isNaN(Date.parse(date)), { message: 'Data do agendamento invalida' }),

});