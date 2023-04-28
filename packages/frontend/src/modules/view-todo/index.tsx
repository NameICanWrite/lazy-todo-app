import { useParams } from "react-router-dom"
import todoService from "../../service/todos"
import { useQuery } from "react-query"
import { useEffect } from "react"

const ViewTodoPage = () => {
  const params: any = useParams()
  const { isLoading, isError, data: todo, error, refetch } = useQuery([`todos:${params.id}`], () =>
    todoService.getOneTodo(params.id)
  )
  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <h1>{todo?.name}</h1>
      <p>{todo?.description}</p>
    </div>
  )
}

export default ViewTodoPage