import axios from 'axios';
import React, { useEffect, useState, useMemo, useLayoutEffect, useRef, useCallback } from 'react';
import { useQuery } from 'react-query';
import Todo from './todo/todo';
import { ITodo } from '../common/types/todos.type';
import todoService from '../../service/todos';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import styled from 'styled-components';
import SwitchButton from './switch-button/switch-button';
import Pagination from '../pagination/pagination';
import { useRadioGroup } from '@mui/material';
import TodosPageComponent from './todos-page.component';
import { BREAKPOINTS } from '../theme';


const MyTodosContainer = () => {
  const history = useHistory()
  const { isLoading, isError, data: todos, error, refetch } = useQuery<ITodo[]>([APP_KEYS.QUERY_KEYS.TODOS], () =>
    todoService.getAllTodos(),
    {refetchOnMount: 'always'}
  )
  const onDeleteTodo =  (id: string) => () => {
    todoService.deleteTodo(id).then(async () => {
      await refetch()
    })
  }
  const onCompleteTodo = (id: string) => () => {
    todoService.completeTodo(id).then(() => {
      refetch()
    })
  }

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const deviceRef = useRef(device)

  const onResize = useCallback(() => {
    const width = window.innerWidth
    if (width >= BREAKPOINTS.tablet && deviceRef.current !== 'desktop') {
      deviceRef.current = 'desktop'
      setDevice(deviceRef.current)
    } else if (width < BREAKPOINTS.tablet && width >= BREAKPOINTS.mobile && deviceRef.current !== 'tablet') {
      deviceRef.current = 'tablet'
      setDevice(deviceRef.current)
    } else if (width < BREAKPOINTS.mobile && deviceRef.current !== 'mobile') {
      deviceRef.current = 'mobile'
      setDevice(deviceRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    refetch()
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
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

  const [currentPage, setCurrentPage] = useState(1)

  const pagesNumber = !todos ? 0 : Math.ceil(todos.length / 10)

  console.log('currentPage', currentPage)
  
  return (
    <TodosPageComponent
      device={device}
      todos={todos as ITodo[]}
      onCompleteTodo={onCompleteTodo}
      onDeleteTodo={onDeleteTodo}
      pagesNumber={pagesNumber}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default MyTodosContainer;

