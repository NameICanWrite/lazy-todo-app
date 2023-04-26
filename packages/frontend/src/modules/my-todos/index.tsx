import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Todo from './todo/todo';
import { ITodo } from '../common/types/todos.type';
import todoService from '../../service/todos';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';

const MyTodosContainer = () => {
  const history = useHistory()
  const { isLoading, isError, data: todos, error, refetch } = useQuery(["todos"], () =>
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
return (
  <div>
  <button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>Create todo</button>
  <br />
  {
    todos?.map((todo: ITodo) => <Todo 
      key={todo.id} 
      todo={todo} 
      onDelete={onDeleteTodo(todo.id)} 
      onComplete={onCompleteTodo(todo.id)}
    />)
  }
  </div>
)
}

export default MyTodosContainer;
