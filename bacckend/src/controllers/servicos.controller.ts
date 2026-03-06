import { Response } from "express";
import { commentSchema } from "../schemas/comment";
import { paginationSchemas } from "../schemas/parpage";
import { servicosSchema } from "../schemas/servicosSchemas";
import { FindMark, mark, unMark } from "../services/bookMark.service";
import { createComments } from "../services/comments.service";
import { RegisterActividade } from "../services/notification.service";
import { FindProfissionalById } from "../services/profissional.service";
import { creatServicesService, deleteServiceByIdservice, findAllServices, findServiceById, getOtherServiceNotId, getServicesWithPagination, updateServiceByIdservice } from "../services/servicos.service";
import { FindUserById } from "../services/user.service";
import { extendedRequest } from "../types/extended-types";
import { getPublicFormattedUrl } from "../utils/url";

export async function creatServicos(req: extendedRequest, res: Response) {
  const safedata = servicosSchema.safeParse(req.body)
  if (!safedata.success) {
    return res.status(400).json({
      error: safedata.error.flatten().fieldErrors
    })
  }

  const images = req.files as Express.Multer.File[]


  if (images.length === 0) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  if (!req.userId || req.role !== 'ADMIN') {
    return res.status(403).json({ error: "Acesso negado" });
  }

  if (safedata.data.professionalId) {
    const profissional = await FindProfissionalById(safedata.data.professionalId);

    if (!profissional) {
      return res.status(404).json({ error: "Profissional não encontrado" });
    }
  }

  const imagem = images.map(image => getPublicFormattedUrl(image.path));

  const newServico = await creatServicesService({
    ...safedata.data,
    duration: parseInt(safedata.data.duration),
    price: parseInt(safedata.data.price),
    images: {
      create: imagem.map(url => ({ url })),
    }
  });

  if (!newServico) {
    return res.status(500).json({ error: "Erro ao criar serviço" });
  }
  await RegisterActividade(`o serviço ${newServico.nome} foi criado`, req.userId as string, newServico.id)
  return res.status(201).json({
    message: "Serviço criado com sucesso",
    servico: newServico
  });
}

export async function commentServico(req: extendedRequest, res: Response) {
  const userId = req.userId as string
  const { id } = req.params;

  const safedata = commentSchema.safeParse(req.body)
  if (!safedata.success) {
    return res.status(400).json({
      error: safedata.error.flatten().fieldErrors
    })
  }
  const user = await FindUserById(userId)

  if (!user) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  const service = await findServiceById(id);
  if (!service) {
    return res.status(404).json({ error: "Serviço não encontrado" });

  }

  const comment = await createComments(id, userId, safedata.data.commentText)

  if (!comment) {
    return res.status(403).json({ error: "Erro ao criar comentario" });
  }
  await RegisterActividade(`o cliete ${user.nome} comentou no serviço ${service.nome}`, userId, service.id)

  return res.status(201).json({
    message: "comentario criado com sucesso",
    comment
  });
}

export async function getServiceById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  if (!id.trim()) {
    return res.status(400).json({ error: "ID do serviço é obrigatório" });
  }
  const service = await findServiceById(id as string);
  if (!service) {
    return res.status(403).json({ error: "Serviço não encontrado" });
  }
  return res.status(200).json({ service });
}

export async function getAllServices(req: extendedRequest, res: Response) {
  const services = await findAllServices();

  return res.status(200).json({ services });
}

export async function updateServiceById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const safedata = servicosSchema.partial().safeParse(req.body);
  if (!safedata.success) {
    return res.status(400).json({
      error: safedata.error.flatten().fieldErrors
    });
  }

  if (!req.userId || (req.role !== 'ADMIN' && req.role !== 'PROFESSIONAL')) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  const service = await findServiceById(id as string)
  if (!service) {
    return res.status(403).json({ message: 'serviço não existe' });
  }
  const updatedService = await updateServiceByIdservice(id as string, {
    ...safedata.data,
    duration: parseInt(safedata.data?.duration ? safedata.data?.duration : service.duration.toLocaleString()),
    price: parseInt(safedata.data?.price ? safedata.data?.price : service.price.toLocaleString()),
  });
  if (!updatedService) {
    return res.status(500).json({ error: "Erro ao atualizar serviço" });
  }

  return res.status(200).json({ message: "Serviço atualizado com sucesso", service: updatedService });
}

export async function deleteServiceById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  if (!req.userId || (req.role !== 'ADMIN' && req.role !== 'PROFESSIONAL')) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  const service = await findServiceById(id as string)
  if (!service) {
    return res.status(403).json({ error: "serviço não encontrado" });
  }
  const deletedService = await deleteServiceByIdservice(id as string);
  if (!deletedService) {
    return res.status(403).json({ error: "Erro ao deletar serviço" });
  }
  return res.status(200).json({ message: "Serviço deletado com sucesso", service: deletedService });
}

export async function getOtherServicesById(req: extendedRequest, res: Response) {
  const { id } = req.params;
  const safeData = paginationSchemas.safeParse(req.query)
  if (!safeData.success) {
    res.json({
      error: safeData.error.flatten().fieldErrors,
    });
    return;
  }


  if (!id.trim()) {
    return res.status(403).json({ error: "ID do serviço é obrigatório" });
  }

  const service = await findServiceById(id as string);
  if (!service) {
    return res.status(403).json({ error: "Serviço não encontrado" });
  }

  let perPage = safeData.data.perPage ?? 10;
  let currentPage = safeData.data.page ?? 0;

  const services = await getOtherServiceNotId(id as string, currentPage, perPage)


  return res.status(200).json({ services });
}

export async function getAllServicesWithPagination(req: extendedRequest, res: Response) {

  const safeData = paginationSchemas.safeParse(req.query)
  if (!safeData.success) {
    res.json({
      error: safeData.error.flatten().fieldErrors,
    });
    return;
  }

  let perPage = safeData.data.perPage ?? 10;
  let currentPage = safeData.data.page ?? 0;

  const services = await getServicesWithPagination(currentPage, perPage)

  return res.status(200).json({ services, page: currentPage });
}

export const ToogleMarkService = async (req: extendedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId as string
  if (!userId) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  const service = await findServiceById(id as string);
  if (!service) {
    return res.status(403).json({ error: "Serviço não encontrado" });
  }

  const isMarked = await FindMark(userId, id as string)

  if (isMarked) {
    await unMark(userId, id as string)
    await RegisterActividade(`uma marcação foi removida `, userId, service.id)
    return res.status(200).json({ message: "Serviço desmarcado", isMarked: false });
  }
  await mark(userId, id as string)
  await RegisterActividade(`uma marcação foi adicionada `, userId, service.id)
  return res.status(200).json({ message: "Serviço marcado", isMarked: true });
}



export const checkMark = async (req: extendedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId as string
  if (!userId) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  const isMarked = await FindMark(userId, id as string)
  if (isMarked) {
    return res.status(200).json(true);
  } else {
    return res.status(200).json(false);
  }
}