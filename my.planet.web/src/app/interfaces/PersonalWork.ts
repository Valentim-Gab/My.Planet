import { Category } from "./Category"
import { User } from "./User"

export interface PersonalWork {
  idPersonalWork?: number
  personalWorkName: string
  description: string
  img?: string
  link: string
  publicWork?: boolean
  idUser?: number
  user?: User
  idCategory?: number | null
  category?: Category
}
