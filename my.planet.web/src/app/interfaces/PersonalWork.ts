import { User } from "./User"

export interface PersonalWork {
  idPersonalWork?: number
  personalWorkName: string
  description: string
  img?: string
  link: string
  idUser?: number
  user?: User
}
