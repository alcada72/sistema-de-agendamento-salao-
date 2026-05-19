
import apiProf from "@/api/api-prof"
import { Agenda, service } from "@/types/servicos"
import { User } from "@/types/user"
import { ID_KEY_PROF, TOKEN_KEY_PROF } from "@/utils/auth.prof"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const GetAllAgendaentosByProfServer = async (): Promise<Agenda[] | undefined> => {
  try {
    const token = await getCookie(TOKEN_KEY_PROF, { cookies })
    const id = await getCookie(ID_KEY_PROF, { cookies })
    const response = await apiProf.get(`/professionals/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.agenda
  } catch (error) {
    console.log(error)
  }

}

export const GetAllAgendaentosServer = async (): Promise<Agenda[] | undefined> => {
  try {
    const response = await apiProf.get(`/appointments`, {})
    return response.data.agenda
  } catch (error) {
    console.log(error)
    return redirect('/')
  }

}

export const GetOtherServicesNotIdServer = async (id: string): Promise<service[]> => {
  const token = await getCookie(TOKEN_KEY_PROF, { cookies })
  const response = await apiProf.get(`/services/other/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.service
}

export const GetServicesLimitedServer = async (page: number = 0, perPage: number = 6): Promise<service[] | undefined> => {

  try {
    const token = await getCookie(TOKEN_KEY_PROF, { cookies })
    const response = await apiProf.get(
      `/service/pagination?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.services;
  } catch (error) {
    console.log(error)
  }

};

export const GetProfissionaisLimitedServer = async (): Promise<User[] | undefined> => {

  try {
    const response = await apiProf.get(`/professionals`, {});
    return response.data.profissionais;
  } catch (error) {
    console.log(error)
  }
};

export const GetClientesLimitedServer = async (): Promise<User[] | undefined> => {

  try {
    const response = await apiProf.get(`/clients`, {});
    return response.data.clients;
  } catch (error) {
    console.log(error)
  }
};