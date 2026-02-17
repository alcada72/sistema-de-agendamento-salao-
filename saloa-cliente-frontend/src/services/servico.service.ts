import api from "@/api/api";
import { agendado } from "@/types/agendamento";
import { agenda, service } from "@/types/servicos";
import { User } from "@/types/user";
import { getID } from "@/utils/auth";
import { redirect } from "next/navigation";

export const GetAllServices = async (): Promise<service[]> => {
  const response = await api.get("/services", {});
  return response.data.services;
};

export const GetAllServicesById = async (id: string): Promise<service> => {
  const response = await api.get(`/services/${id}`, {});
  return response.data.service;
};

export const GetOtherServicesNotId = async (id: string): Promise<service[]> => {
  const response = await api.get(
    `/services/other/${id}?page=${0}&perPage=4`,
    {}
  );
  return response.data.services;
};

export const GetServicesLimited = async (page: number = 0, perPage: number = 6): Promise<service[]> => {
  const response = await api.get(
    `/services/pagination?page=${page}&perPage=${perPage}`,
    {}
  );
  return response.data.services;
};

export const PostAgendamento = async (data: { serviceId: string, professionalId: string, date: string }) => {
  try {
    const res = await api.post<agendado>("/appointments", data)
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const GetProfissionaisLimited = async (): Promise<User[] | undefined> => {

  try {
    const response = await api.get(
      `/professionals`,
      {

      }
    );
    return response.data.profissionais;
  } catch (error) {
    console.log(error)
    return redirect('/')
  }

};

export const GetAllAgendaentosByUser = async (): Promise<agenda[] | undefined> => {
  try {
    const id = await getID()
    const response = await api.get(`/clients/appointments/${id}`, {})
    return response.data.agenda
  } catch (error) {
    console.log(error)
    return redirect('/')
  }
}

export const DeleteAgendamentoById = async (id: string): Promise<boolean | undefined> => {
  try {
    const res = await api.delete(`/appointments/${id}`)
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}
export const CancelAgendamentoById = async (id: string, status: "CONFIRMED" | "PENDING" | "CANCELLED"): Promise<boolean | undefined> => {
  try {
    const res = await api.put(`/appointments/status/${id}`, {
      status
    })
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}