import styled from "styled-components"
import { Button } from "../my-todos/todo/todo.styled"
import { SPACES } from "../theme"
import { CreateButton } from "../my-todos/todos-page.styled"

export const Header = styled('h1')`
`

export const Description = styled('p')`
`

export const Wrapper = styled('div')`
  margin: ${SPACES.xs}
`

export const EditButton = styled(CreateButton)`
  margin-top: ${SPACES.sm};
  margin-bottom: ${SPACES.xs};
`