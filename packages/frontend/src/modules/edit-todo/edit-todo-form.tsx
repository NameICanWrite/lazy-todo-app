import { useFormik } from "formik"
import todoService from "../../service/todos"
import { ITodoCreate } from "../common/types/todos.type"
import { useHistory } from "react-router-dom"
import { APP_KEYS } from "../common/consts"
import { ITodo } from "../common/types/todos.type"
import { useEffect } from "react"

const EditTodoForm = ({todo}: {todo: ITodo}) => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      name: todo.name,
      description: todo.description,
      isCompleted: todo.isCompleted,
      isPrivate: todo.isPrivate,
      id: todo.id,
    },
    onSubmit: async (todo: ITodo) => {
        await todoService.editTodo(todo)
        history.push(APP_KEYS.ROUTER_KEYS.MY_TODOS)
    }
  })
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Enter name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="Enter description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <label htmlFor="isPrivate">Is private</label>
      <input
        id="isPrivate"
        name="isPrivate"
        type="checkbox"
        checked={formik.values.isPrivate}
        onChange={formik.handleChange}
      />
      <button>Submit</button>
    </form>
  )
}

export default EditTodoForm