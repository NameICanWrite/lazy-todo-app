import { useHistory } from "react-router-dom"
import { ITodo } from "../../common/types/todos.type"
import { v4 as uuidv4 } from 'uuid'
import { APP_KEYS } from "../../common/consts"
import { FC } from "react"
import styled from "styled-components"

export type TodoProps = {
  todo: ITodo,
  onComplete: () => void,
  onDelete: () => void,
  index: number
}

const Todo: FC<TodoProps> = ({ todo, onDelete, onComplete, index }) => {
  const { name, description, isCompleted, isPrivate } = todo
  const history = useHistory()

  return (
    <Container index={index}>
      <Name>{name}</Name>
      <Description>{description}</Description>
      <Actions>
        <p>{isCompleted ? 'Completed' : 'Not completed'}</p>
        <p>{isPrivate ? 'Private' : 'Public'}</p>
        <Button onClick={onDelete}>Delete</Button>
        {!todo.isCompleted &&
          <Button onClick={onComplete}>Complete</Button>
        }
        <Button onClick={() => history.push(`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/${todo.id}`)}>
          Edit
        </Button>
      </Actions>
    </Container>
  )
}

export default Todo

export const Name = styled('h3')`
  width: 20%;
  padding-left: 10px;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
`
export const Description = styled('div')`  
  border-color: black;
  border-right: 2px solid;
  width: 60%;
  padding-left: 10px;
  display: flex;
  align-items: center;
`
export const Container = styled('div')<{index: number}>`
  display: flex;
  box-sizing: border-box;
  border-color: black;
  background-color: ${props => props.index % 2 ===0 ? '#ececec' : 'white'}
`

export const Button = styled('button')`
  background-color: transparent
`

export const Actions = styled('div')`
  width: 20%;
  padding-left: 10px;
  border-color: black;
`
