

export interface ITodo {
  id: string
  name: string
  description: string
  isPrivate: boolean
  isCompleted?: boolean
}

export interface ITodoCreate {
  name: string
  description: string
  isPrivate: boolean
  isCompleted?: boolean
}
