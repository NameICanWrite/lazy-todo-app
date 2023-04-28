import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import Todo from './todo/todo';
import { ITodo } from '../common/types/todos.type';
import todoService from '../../service/todos';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import styled from 'styled-components';
import SwitchButton from './switch-button/switch-button';
import Pagination from '../pagination/pagination';
import Slider from '../slider/slider'

const MyTodosContainer = () => {
  const history = useHistory()
  const { isLoading, isError, data: todos, error, refetch } = useQuery<ITodo[]>(["todos"], () =>
    todoService.getAllTodos()
  )
  const onDeleteTodo = (id: string) => () => {
    todoService.deleteTodo(id).then(() => {
      refetch()
    })
  }
  const onCompleteTodo = (id: string) => () => {
    todoService.completeTodo(id).then(() => {
      refetch()
    })
  }

  useEffect(() => {
    refetch()
  }, [])

  // test todos
  // const todos: ITodo[] = useMemo(() => {
  //   const todos = []
  //   for (let i = 0; i < 100; i++) {
  //     todos.push({
  //       id: `${i}`,
  //       completed: false,
  //       isPrivate: false,
  //       description: `description${i}`,
  //       name: `name${i}`
  //     })
  //   }
  //   return todos
  // }, [])

  console.log('todos', todos)

  // const [on, setOn] = useState(false)

  // const onSwitch = () => {
  //   setOn(!on)
  //
  const [currentPage, setCurrentPage] = useState(1)

  const pagesNumber = !todos ? 0 : Math.floor(todos.length / 10)

  console.log('currentPage', currentPage)

  return (
    <Container>
      <Button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
        Create todo
      </Button>
      <TodosTable>
        {todos && 
        Array.from({length: 10}, (_, i) => (currentPage - 1) * 10 + i)
        .filter(i => i < todos.length)
        .map(i => todos[i])
        .map((todo, index) => (
          <Todo
            index={index}
            key={todo.id}
            todo={todo}
            onDelete={onDeleteTodo(todo.id)}
            onComplete={onCompleteTodo(todo.id)}
          />
        ))}
      </TodosTable>
      {todos && <Slider perSlide={1}>
        {todos.map((todo, index) => (
          <Todo
            index={index}
            key={todo.id}
            todo={todo}
            onDelete={onDeleteTodo(todo.id)}
            onComplete={onCompleteTodo(todo.id)}
          />
        ))}
      </Slider>}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesNumber={pagesNumber} />
      {/* <SwitchButton on={on} onSwitch={onSwitch}/> */}
    </Container>
  )
}

export default MyTodosContainer;

export const Container = styled.div`
  padding: 20px;
`
export const Button = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  margin-bottom: 20px;
`

export const TodosTable = styled('div')`
  border: 2px solid black;
`