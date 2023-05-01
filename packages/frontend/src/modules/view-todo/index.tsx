import { useParams } from "react-router-dom"
import todoService from "../../service/todos"
import { useQuery } from "react-query"
import { useEffect } from "react"
import styled from "styled-components"
import { useOneTodo } from "../common/hooks/use-one-todo"
import { Description, Header, Wrapper } from "./view-todo.styled"

const ViewTodoPage = () => {
  const todo = useOneTodo()

  return (
    <Wrapper>
      <Header>{todo?.name}</Header>
      <Description>{todo?.description}</Description>
    </Wrapper>
  )
}



export default ViewTodoPage