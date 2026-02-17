import api from "@/api/api"
import { agenda, service } from "@/types/servicos"
import { User } from "@/types/user"
import { ID_KEY_USER, TOKEN_KEY_USER } from "@/utils/auth"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const GetAllAgendaentosByUserServer = async (): Promise<agenda[] | undefined> => {
  try {
    const token = await getCookie(TOKEN_KEY_USER, { cookies })
    const id = await getCookie(ID_KEY_USER, { cookies })
    const response = await api.get(`/clients/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.agenda
  } catch (error) {
    console.log(error)
  }

}

export const GetAllAgendaentosServer = async (): Promise<agenda[] | undefined> => {
  try {
    const response = await api.get(`/appointments`, {})
    return response.data.agenda
  } catch (error) {
    console.log(error)
    return redirect('/')
  }

}

export const GetOtherServicesNotIdServer = async (id: string): Promise<service[]> => {
  const token = await getCookie(TOKEN_KEY_USER, { cookies })
  const response = await api.get(`/services/other/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.service
}

export const GetServicesLimitedServer = async (page: number = 0, perPage: number = 6): Promise<service[] | undefined> => {

  try {
    const token = await getCookie(TOKEN_KEY_USER, { cookies })
    const response = await api.get(
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
    const response = await api.get(`/professionals`, {});
    return response.data.profissionais;
  } catch (error) {
    console.log(error)
  }
};

export const GetClientesLimitedServer = async (): Promise<User[] | undefined> => {

  try {
    const response = await api.get(`/clients`, {});
    return response.data.clients;
  } catch (error) {
    console.log(error)
  }
};