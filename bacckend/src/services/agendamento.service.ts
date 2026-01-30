import { AgendamentoStatus } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { getPublicURL } from "../utils/url";

interface AvailableSlotsParams {
  professionalId: string;
  serviceId: string;
  date: Date; // dia escolhido (ex: 2026-01-05)
}

interface CreateAgendamentoDTO {
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: Date;
}


export const CreateAgendamento = async (data: CreateAgendamentoDTO) => {
  const { clientId, professionalId, serviceId, date } = data;

  // 🔐 Dados obrigatórios
  if (!clientId || !professionalId || !serviceId || !date) {
    throw new Error("Dados incompletos para criar o agendamento");
  }

  // 🔐 cliente ≠ profissional
  if (clientId === professionalId) {
    throw new Error("O cliente não pode ser o mesmo que o profissional");
  }

  // 🔍 Buscar serviço
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) {
    throw new Error("Serviço inválido");
  }

  // ⏱️ Calcular endDate NO BACKEND
  const endDate = new Date(
    date.getTime() + service.duration * 60000
  );

  // ⏱️ horário inválido
  if (endDate <= date) {
    throw new Error("Horário inválido");
  }

  // 🔐 TRANSACTION (muito importante)
  return prisma.$transaction(async tx => {

    // 📅 conflito de horário
    const conflito = await tx.agendamento.findFirst({
      where: {
        professionalId,
        status: {
          in: ["PENDING", "CONFIRMED"]
        },
        AND: [
          { date: { lt: endDate } },
          { endDate: { gt: date } }
        ]
      }
    });

    if (conflito) {
      throw new Error("O profissional já possui um agendamento nesse horário");
    }

    return tx.agendamento.create({
      select: {
        id: true,
        date: true,
        endDate: true,
        status: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            nome: true,
            image: true
          }
        },
        professional: {
          select: {
            id: true,
            nome: true,
            image: true
          }
        },
        service: {
          select: {
            id: true,
            nome: true,
            description: true,
            duration: true,
            price: true
          }
        },


      },
      data: {
        clientId,
        professionalId,
        serviceId,
        date,
        endDate
      }
    });
  });
};

export const FindAgendamentosByServiceId = async (serviceId: string) => {
  const agendamentos = await prisma.agendamento.findMany({
    select: {
      id: true,
      date: true,
      endDate: true,
      status: true,
      createdAt: true,
      client: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      service: {
        select: {
          id: true,
          nome: true,
          description: true,
          duration: true,
          price: true
        }
      },
    },
    where: { serviceId },
    orderBy: { createdAt: 'asc' }
  })
  return agendamentos
}

export const FindAgendamentoById = async (id: string) => {
  const agendamento = await prisma.agendamento.findFirst({
    select: {
      id: true,
      date: true,
      endDate: true,
      status: true,
      createdAt: true,
      client: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      service: {
        select: {
          id: true,
          nome: true,
          description: true,
          duration: true,
          price: true
        }
      },
    },
    where: { id }
  })
  return agendamento
}

export const DeleteAgendamentoById = async (id: string) => {
  const agendamento = await prisma.agendamento.delete({
    where: { id }
  })
  return agendamento
}

export const UpdateAgendamentoById = async (
  id: string,
  data: Partial<CreateAgendamentoDTO>
) => {
  const agendamentoAtual = await prisma.agendamento.findUnique({
    where: { id }
  });

  if (!agendamentoAtual) {
    throw new Error("Agendamento não encontrado");
  }

  const date = data.date ?? agendamentoAtual.date;
  const professionalId =
    data.professionalId ?? agendamentoAtual.professionalId;
  const serviceId = data.serviceId ?? agendamentoAtual.serviceId;

  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) throw new Error("Serviço inválido");

  const endDate = new Date(
    date.getTime() + service.duration * 60000
  );

  // 📅 conflito de horário
  const conflito = await prisma.agendamento.findFirst({
    where: {
      professionalId,
      id: { not: id },
      status: { in: ["PENDING", "CONFIRMED"] },
      AND: [
        { date: { lt: endDate } },
        { endDate: { gt: date } }
      ]
    }
  });

  if (conflito) {
    throw new Error("Conflito de horário com outro agendamento");
  }

  return prisma.agendamento.update({
    where: { id },
    data: {
      ...data,
      date,
      endDate
    }
  });
};

export const FindAllAgendamentos = async () => {
  const agendamentos = await prisma.agendamento.findMany({
    select: {
      id: true,
      date: true,
      endDate: true,
      status: true,
      createdAt: true,
      client: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      service: {
        select: {
          id: true,
          nome: true,
          description: true,
          duration: true,
          price: true
        }
      },
    },
    where: {
      endDate: {
        gt: new Date()
      }
    }
  })
  return agendamentos
}

export const GetAvailableSlots = async ({
  professionalId,
  serviceId,
  date
}: AvailableSlotsParams) => {

  // 1️⃣ Serviço
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) throw new Error("Serviço não encontrado");

  const duration = service.duration;

  // 2️⃣ Início e fim do dia
  const dayStart = new Date(date);
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(18, 0, 0, 0);

  // 3️⃣ Agendamentos existentes
  const bookings = await prisma.agendamento.findMany({
    where: {
      professionalId,
      status: { in: ["PENDING", "CONFIRMED"] },
      date: {
        gte: dayStart,
        lt: dayEnd
      }
    },
    orderBy: { date: "asc" }
  });

  // 4️⃣ Gerar slots
  const slots = [];
  let slotStart = new Date(dayStart);

  while (true) {
    const slotEnd = new Date(
      slotStart.getTime() + duration * 60000
    );

    if (slotEnd > dayEnd) break;

    const conflito = bookings.some(b => (
      slotStart < b.endDate &&
      slotEnd > b.date
    ));

    if (!conflito && slotStart > new Date()) {
      slots.push({
        start: new Date(slotStart),
        end: new Date(slotEnd)
      });
    }

    slotStart = new Date(
      slotStart.getTime() + duration * 60000
    );
  }

  return slots;
};

export const GetAgendamentoByUser = async (id: string) => {
  const agendamentos = await prisma.agendamento.findMany({
    select: {
      id: true,
      date: true,
      endDate: true,
      status: true,
      createdAt: true,
      client: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      professional: {
        select: {
          id: true,
          nome: true,
          image: true
        }
      },
      service: {
        select: {
          id: true,
          nome: true,
          description: true,
          duration: true,
          price: true,
          images: true,
        }
      },
    },
    where: {
      clientId: id
    },
    orderBy: { date: 'desc' }
  })
  for (const agendImdex in agendamentos) {
    const images = agendamentos[agendImdex].service.images;
    agendamentos[agendImdex].client.image = getPublicURL(
      agendamentos[agendImdex].client.image || undefined);

    agendamentos[agendImdex].professional.image = getPublicURL(
      agendamentos[agendImdex].professional.image || undefined);


    for (const imagesIndex in images) {
      images[imagesIndex].url = getPublicURL(images[imagesIndex].url)
    }


  }
  return agendamentos
}

export const updateSatusAgendamentoById = async (id: string, status: AgendamentoStatus) => {
  const agendamento = await prisma.agendamento.update({
    where: { id },
    data: { status }
  })
  return agendamento
}