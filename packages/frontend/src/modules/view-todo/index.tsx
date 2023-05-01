import { useHistory, useParams } from "react-router-dom"
import todoService from "../../service/todos"
import { useQuery } from "react-query"
import { useEffect } from "react"
import styled from "styled-components"
import { useOneTodo } from "../common/hooks/use-one-todo"
import { Description, EditButton, Header, Wrapper } from "./view-todo.styled"
import { Button } from "../my-todos/todo/todo.styled"
import { APP_KEYS } from "../common/consts"

const ViewTodoPage = () => {
  const todo = useOneTodo()
  const history = useHistory()
  return (
    <Wrapper>
      <Header>{todo?.name}</Header>
      <Description>{todo?.description}</Description>
      <EditButton onClick={() => history.push(`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/${todo.id}`)}>Edit</EditButton>
    </Wrapper>
  )
}



export default ViewTodoPage