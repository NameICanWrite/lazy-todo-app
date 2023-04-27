import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Todo from './todo/todo';
import { ITodo } from '../common/types/todos.type';
import todoService from '../../service/todos';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import styled from 'styled-components';

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

  console.log('todos', todos)

  console.log('loading', isLoading)

  return (
    <Container>
      <Button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
        Create todo
      </Button>
      <TodosTable>
        {todos && todos.map((todo, index) => (
          <Todo
            index={index}
            key={todo.id}
            todo={todo}
            onDelete={onDeleteTodo(todo.id)}
            onComplete={onCompleteTodo(todo.id)}
          />
        ))}
      </TodosTable>
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