import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import todoService from "../../../service/todos"
import { useEffect } from "react"
import { APP_KEYS } from "../consts"
import { ITodo } from "../types/todos.type"

export function useOneTodo() {
  const params: any = useParams()
  const { isLoading, isError, data: todo, error, refetch } = useQuery<ITodo>([`${APP_KEYS.QUERY_KEYS.TODOS}:${params.id}`], () =>
    todoService.getOneTodo(params.id)
  )
  useEffect(() => {
    refetch()
  }, [])
  return {todo, refetch}
}