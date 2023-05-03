import styled from "styled-components"
import { Button } from "../my-todos/todo/todo.styled"
import { SPACES } from "../theme"
import { CreateButton } from "../my-todos/todos-page.styled"

export const Header = styled('h1')`
margin-bottom: ${SPACES.md}
`

export const Description = styled('p')`
  margin-bottom: ${SPACES.md}
`

export const Wrapper = styled('div')`
  margin: ${SPACES.xs};
  padding: ${SPACES.lg}
`

export const EditButton = styled(CreateButton)`
  margin-top: ${SPACES.sm};
  margin-bottom: ${SPACES.xs};
`

export const DescriptionText = styled('div')`
  margin-top: ${SPACES.xxs};
`

export const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 200px;
  align-items: center;
`

export const BackButton = styled(CreateButton)`
  margin-top: ${SPACES.sm};
  margin-bottom: ${SPACES.xs};
`