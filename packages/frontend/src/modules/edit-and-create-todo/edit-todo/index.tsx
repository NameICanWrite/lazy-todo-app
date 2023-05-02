import { useParams } from "react-router-dom"
import todoService from "../../../service/todos"
import { useQuery } from "react-query"
import EditTodoForm from "../modify-todo-form"
import { useEffect } from "react"
import EditTodoFormContainer from "./edit-todo-form.container"
import { useOneTodo } from "../../common/hooks/use-one-todo"
import styled from "styled-components"
import { SPACES } from "../../theme"
import { FONT_SIZES } from "../../theme/fonts.const"

const EditTodoPage = () => {
  const {todo} = useOneTodo()
  return (
    <div>
      <H1>Edit Todo Page</H1>
      {todo && <EditTodoFormContainer todo={todo} />}
    </div>
  )
}
export const H1 = styled('h1')`
  font-size: ${FONT_SIZES.l};
  text-align: center;
  margin-top: ${SPACES.l};
`
export default EditTodoPage

