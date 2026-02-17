import { AgendamentoStatus } from "@prisma/client";
import { Request, Response } from "express";
import { agendaSchemas } from "../schemas/agendaSchemas";
import { CreateAgendamento, DeleteAgendamentoById, FindAgendamentoById, FindAllAgendamentos, UpdateAgendamentoById, updateSatusAgendamentoById } from "../services/agendamento.service";
import { RegisterActividade, sendNotifications } from "../services/notification.service";
import { FindUserById } from "../services/user.service";
import { extendedRequest } from "../types/extended-types";

export async function createAppointment(req: extendedRequest, res: Response) {
  const userId = req.userId;
  const safedata = agendaSchemas.safeParse(req.body);
  if (!safedata.success) {
    return res.status(400).json({
      error: safedata.error.flatten().fieldErrors
    });
  }
  if (!userId) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const user = await FindUserById(userId)

  if (!user) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const agenda = await CreateAgendamento({
    ...safedata.data,
    clientId: userId as string,
    date: new Date(safedata.data.date)
  });

  await RegisterActividade(`Cliente ${user?.nome} agendou o serviço ${agenda.service.nome} `, user.id, agenda.service.id)
  await sendNotifications(`Cliente ${user?.nome} agendou o serviço ${agenda.service.nome} `, agenda.professional.id, agenda.service.id, user.id)
  // Implementation here
  return res.status(201).json({ message: "Agendamento criado com sucesso", agenda });
}

export async function getAppointmentById(req: extendedRequest, res: Response) {
  const { id } = req.params

  if (!id.trim()) {
    return res.json({ error: 'Informe um id por favor' })
  }

  const agenda = await FindAgendamentoById(id as string)

  if (!agenda) {
    return res.json({ error: 'Agendamento não existe' })
  }

  res.status(200).json({ agenda })
}

export async function getAllAppointments(req: extendedRequest, res: Response) {
  const agenda = await FindAllAgendamentos()

  res.status(200).json({ agenda })
}

export async function updateAppointmentById(req: extendedRequest, res: Response) {
  const { id } = req.params
  const { date } = req.body;

  if (!id.trim()) {
    return res.json({ error: 'Informe um id por favor' })
  }
  if (!date.trim()) {
    return res.json({ error: 'informe outra data' })
  }

  const agendado = await FindAgendamentoById(id as string)

  if (!agendado) {
    return res.json({ error: 'agenda não existente' })
  }
  const agenda = await UpdateAgendamentoById(agendado.id as string, {
    ...agendado,
    date: new Date(date)
  })
}

export async function deleteAppointmentById(req: Request, res: Response) {
  const { id } = req.params

  if (!id.trim()) {
    return res.status(403).json({ error: 'Informe um id por favor' })
  }

  const agendado = await FindAgendamentoById(id as string)

  if (!agendado) {
    return res.status(403).json({ error: 'agenda não existente' })
  }

  const agenda = await DeleteAgendamentoById(agendado.id as string)

  if (agenda) {
    return res.status(200).json({ message: 'agenda excluida com sucesso' })

  } else {
    return res.status(403).json({ error: 'erro ao excluir a agenda' })

  }
}

export async function comfirmAppointmentById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !id.trim()) {
    return res.status(400).json({ error: "Informe um id por favor" });
  }

  if (!status) {
    return res.status(400).json({ error: "Informe o status do agendamento" });
  }

  // ✅ valida enum
  if (!Object.values(AgendamentoStatus).includes(status)) {
    return res.status(400).json({
      error: "Status inválido",
      validos: Object.values(AgendamentoStatus),
    });
  }

  const agendado = await FindAgendamentoById(id);

  if (!agendado) {
    return res.status(404).json({ error: "Agenda não existente" });
  }

  const user = await FindUserById(agendado.client.id)

  if (!user) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const agendaAtualizada = await updateSatusAgendamentoById(agendado.id, status as AgendamentoStatus);
  if (!agendaAtualizada) {
    return res.status(400).json({
      message: "Erro ao atualizar",
    });
  }

  console.log(agendaAtualizada)
  await RegisterActividade(`uma agenda foi atualizada para ${agendaAtualizada.status} `, agendaAtualizada.clientId, agendaAtualizada.serviceId)

  if (agendaAtualizada.status == 'CONFIRMED' || agendaAtualizada.status == 'COMPLETED') {
    await sendNotifications(`Cliente ${user?.nome} a sua agenda foi ${agendaAtualizada.status} `,
      agendaAtualizada.clientId,
      agendaAtualizada.serviceId,
      agendaAtualizada.professionalId
    )
  }

  return res.status(200).json({
    message: "Agendamento atualizado com sucesso",
    agenda: agendaAtualizada,
  });
}
4