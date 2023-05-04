import { User } from "./user.types"


export interface ITodo {
  id: string
  name: string
  description: string
  isPrivate: boolean
  isCompleted?: boolean,
  user: User
}

export interface ITodoCreate {
  name: string
  description: string
  isPrivate: boolean
  isCompleted?: boolean
}
