import { useHistory } from "react-router-dom"
import { ITodo } from "../../common/types/todos.type"
import { APP_KEYS } from "../../common/consts"
import { FC } from "react"
import styled from "styled-components"
import { useState } from "react"
import SwitchButton from "../switch-button/switch-button"
import { useEffect } from "react"

export type TodoProps = {
  todo: ITodo,
  onComplete: () => void,
  onDelete: () => void,
  index: number
}

const Todo: FC<TodoProps> = ({ todo, onDelete, onComplete, index }) => {
  const { name, description, isCompleted, isPrivate, id } = todo
  const history = useHistory()

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
        <DeleteButton onClick={onDelete}>
          Delete
        </DeleteButton>
        <CompleteButton
          on={isCompleted ?? false}
          onSwitch={onCompleted}
          name={'Completed'}
        />
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
  @media (max-width: 768px){
    border: none;
    width: 100%;
    margin-bottom: 10px;
  }
`
export const Description = styled('div')`  
  border-color: black;
  border-right: 2px solid;
  overflow-wrap: break-all;
  word-wrap: break-all;
  overflow-wrap: anywhere;
  word-wrap: break-all;
  width: 80%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  @media (max-width: 768px){
    border: none;
    width: 100%;
    min-height: 100px;
    align-items: start;
    margin-bottom: 10px;
  }
`
export const DescriptionText = styled('div')`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Container = styled('div') <{ index: number }>`
  display: flex;
  box-sizing: border-box;
  background-color: ${props => props.index % 2 === 0 ? '#ececec' : 'white'};
  @media (max-width: 768px){
    flex-direction: column;
    background-color: transparent;
  }
  @media(max-width: 425px) {
    margin-bottom: 30px
  }
`

export const Button = styled('button')`
  background-color: white;
  cursor: pointer;
`
export const ViewButton = styled(Button)`
  margin-right: 10px;
  margin-left: 20px;
  @media (max-width: 991px){
    margin-right: 10px;
    margin-left: 15px;
  };
`
export const DeleteButton = styled(Button)`
  margin-right: 20px;
  @media (max-width: 991px){
    margin-right: 10px;
  }
`
const CompleteButton = styled(SwitchButton)`
  margin-right: 50px;
  @media (max-width: 991px){
    margin-right: 20px;
  }
`
export const Actions = styled('div')`
  padding: 5px 0;
  border-color: black;
  display: flex;
  align-items: center;
`
