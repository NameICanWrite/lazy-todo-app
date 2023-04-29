// TODO: Put a real interfaces here

import { User } from "../entities/User"
import { IUser } from "./user.type"
import { DeepPartial } from "typeorm"

export interface ITodo {
  id?: string
  name: string
  description: string
  isPrivate: boolean
  isCompleted?: boolean,
  user: IUser | User
}
