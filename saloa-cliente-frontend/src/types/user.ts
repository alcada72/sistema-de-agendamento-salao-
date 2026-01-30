export type User = {
  id: string,
  nome: string,
  telefone: string,
  email: string,
  role: string,
  image: string,
  images: images[],
};

export interface UserInfo {
  user: User
}

export type images = {
  id: string,
  url: string
}