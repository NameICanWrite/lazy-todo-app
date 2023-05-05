import { useHistory } from "react-router-dom"
import { ITodo } from "../../common/types/todos.type"
import { APP_KEYS } from "../../common/consts"
import { FC } from "react"
import styled from "styled-components"
import { useState } from "react"
import { useEffect } from "react"
import { Actions, Container, DeleteButton, Description, DescriptionText, Name, ViewButton, CompleteButton } from "./todo.styled"
import { useGetUser } from "../../common/hooks/use-get-user"
import { CircularProgress } from "@mui/material"

export type TodoProps = {
  todo: ITodo,
  onComplete: () => void,
  onDelete: () => void,
  index: number
}

const Todo: FC<TodoProps> = ({ todo, onDelete, onComplete, index }) => {
  const { name, description, isCompleted, isPrivate, id, user} = todo
  const history = useHistory()
  const { user: currentUser } = useGetUser()

  const onCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCompleted) {
      onComplete()
    }
  }

  return (
    <Container index={index}>
      <Name>
        {name}
      </Name>
      <Description>
        <DescriptionText>
          {description}
        </DescriptionText>
      </Description>
      <Actions>
        <ViewButton onClick={() => { history.push(`${APP_KEYS.ROUTER_KEYS.VIEW_TODO}/${id}`) }}>
          View
        </ViewButton>
        {user?.id == currentUser?.id ? (
          <>
            <DeleteButton onClick={onDelete}>
              Delete
            </DeleteButton>
            <CompleteButton
              on={isCompleted ?? false}
              onSwitch={onCompleted}
              name={'Completed'}
            />
          </>
        ) : (
          <div>
            Not yours
          </div>
        )}
      </Actions>
    </Container >
  )
}

export default Todo


