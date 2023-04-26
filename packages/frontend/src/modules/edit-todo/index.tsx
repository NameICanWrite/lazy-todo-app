import { useParams } from "react-router-dom"
import todoService from "../../service/todos"
import { useQuery } from "react-query"
import EditTodoForm from "./edit-todo-form"
import { useEffect } from "react"

const EditTodoPage = () => {
  const params: any = useParams()
  const { isLoading, isError, data: todo, error, refetch } = useQuery([`todos[${params.id}]`], () =>
    todoService.getOneTodo(params.id)
  )
  return (
    <div>
      <h1>Edit Todo Page</h1>
      {todo && <EditTodoForm todo={todo} />}
    </div>
  )
}

export default EditTodoPage