import { PersonalWork } from "./PersonalWork";
import { User } from "./User";

export interface Commentary {
  idCommentary?: number,
  txtCommentary: string,
  //idUser: number,
  // idPersonalWork: number,
  user?: User,
  personalWork?: PersonalWork
}