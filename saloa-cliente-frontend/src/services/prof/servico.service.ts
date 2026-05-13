import apiProf from "@/api/api-prof";
import { agenda, service } from "@/types/servicos";
import { User } from "@/types/user";
import { getID } from "@/utils/auth";
import { redirect } from "next/navigation";

export const GetAllServices = async (): Promise<service[]> => {
  const response = await apiProf.get("/services", {});
  return response.data.services;
};

export const GetAllServicesById = async (id: string): Promise<service> => {
  const response = await apiProf.get(`/services/${id}`, {});
  return response.data.service;
};

export const GetOtherServicesNotId = async (id: string): Promise<service[]> => {
  const response = await apiProf.get(
    `/services/other/${id}?page=${0}&perPage=4`,
    {}
  );
  return response.data.services;
};

export const GetServicesLimited = async (page: number = 0, perPage: number = 6): Promise<service[]> => {
  const response = await apiProf.get(
    `/services/pagination?page=${page}&perPage=${perPage}`,
    {}
  );
  return response.data.services;
};



export const GetProfissionaisLimited = async (): Promise<User[] | undefined> => {

  try {
    const response = await apiProf.get(
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

export const GetAllAgendaentosByProf = async (): Promise<agenda[] | undefined> => {
  try {
    const id = await getID()
    const response = await apiProf.get(`/professionals/appointments/${id}`, {})
    return response.data.agenda
  } catch (error) {
    console.log(error)
    return redirect('/')
  }
}

export const DeleteAgendamentoById = async (id: string): Promise<boolean | undefined> => {
  try {
    const res = await apiProf.delete(`/appointments/${id}`)
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

export const CancelAgendamentoById = async (id: string, status: "CONFIRMED" | "PENDING" | "CANCELLED" | 'COMPLETED'): Promise<boolean | undefined> => {
  try {
    const res = await apiProf.put(`/appointments/status/${id}`, {
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