import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
import Pagination from "../pagination/pagination";
import Todo from "./todo/todo";
import Slider from "../slider/slider";
import styled from "styled-components";
import { ITodo } from "../common/types/todos.type";
import {FC} from 'react'

export type TodosPageProps = {
  device: 'mobile' | 'desktop' | 'tablet',
  todos: ITodo[],
  onCompleteTodo: (id: string) => void,
  onDeleteTodo: (id: string) => void,
  pagesNumber: number,
  currentPage: number,
  setCurrentPage: (number: number) => void
}

const TodosPageComponent: FC<TodosPageProps> = (props) => {
  const { device, todos, onCompleteTodo, onDeleteTodo, pagesNumber, currentPage, setCurrentPage} = props
  const history = useHistory()
  return (
    <Container>
      <CreateButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
        Create todo
      </CreateButton>
      {device === 'desktop' ? (
        <>
          <TodosTable>
            {todos &&
              Array.from({ length: 10 }, (_, i) => (currentPage - 1) * 10 + i)
                .filter(i => i < todos.length)
                .map(i => todos[i])
                .map((todo, index) => (
                  <Todo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    onDelete={() => onDeleteTodo(todo.id)}
                    onComplete={() => onCompleteTodo(todo.id)}
                  />
                ))}
          </TodosTable>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesNumber={pagesNumber} />
        </>
      ) : device === 'tablet' ? (
        <>
          {todos && (
            <Slider perSlide={1}>
              {todos.map((todo, index) => (
                <Todo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  onDelete={() => onDeleteTodo(todo.id)}
                  onComplete={() => onCompleteTodo(todo.id)}
                />
              ))}
            </Slider>
          )}
        </>
      ) : (
        <>
          {todos && todos.map((todo, index) => (
            <Todo
              index={index}
              key={todo.id}
              todo={todo}
              onDelete={() => onDeleteTodo(todo.id)}
              onComplete={() => onCompleteTodo(todo.id)}
            />
          ))}
        </>
      )}
      {/* <SwitchButton on={on} onSwitch={onSwitch}/> */}
    </Container>
  )
}

export default TodosPageComponent;

export const Container = styled.div`
  padding: 20px;
  @media(max-width: 768px) {
    padding: 100px 50px;
  }
  @media(max-width: 425px) {
    padding: 100px 10px;
  }
`
export const CreateButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  margin-bottom: 40px;
  cursor: pointer
`

export const TodosTable = styled('div')`
  border: 2px solid black;
`