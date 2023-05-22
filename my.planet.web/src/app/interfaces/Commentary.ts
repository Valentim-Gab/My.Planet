import { PersonalWork } from "./PersonalWork";
import { User } from "./User";

export interface Commentary {
  idCommentary?: number,
  txtCommentary: string,
  user?: User,
  personalWork?: PersonalWork
}