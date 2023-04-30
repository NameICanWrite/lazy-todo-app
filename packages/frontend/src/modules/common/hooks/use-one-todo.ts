import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import todoService from "../../../service/todos"
import { useEffect } from "react"

export function useOneTodo() {
  const params: any = useParams()
  const { isLoading, isError, data: todo, error, refetch } = useQuery([`todos:${params.id}`], () =>
    todoService.getOneTodo(params.id)
  )
  useEffect(() => {
    refetch()
  }, [])
  return todo
}