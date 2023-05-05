import axios from 'axios'
import React, { useEffect, useState, useMemo, useLayoutEffect, useRef, useCallback, ChangeEvent } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import Todo from './todo/todo'
import { ITodo } from '../common/types/todos.type'
import todoService from '../../service/todos'
import { useHistory, useLocation } from 'react-router-dom'
import { APP_KEYS } from '../common/consts'
import styled from 'styled-components'
import SwitchButton from './switch-button/switch-button'
import Pagination from '../pagination/pagination'
import { useRadioGroup } from '@mui/material'
import TodosPageComponent from './todos-page.component'
import { BREAKPOINTS } from '../theme'
import { useSetClientTodos } from '../common/hooks/use-set-client-todos'
import { DeviceResolution } from '../common/types/devices.types'
import { useQueryParams } from '../common/hooks/useQueryParams'
import { User } from '../common/types/user.types'
import { useQueryClient } from 'react-query'
import userService from '../../service/user'
import { TODOS_ON_PAGINATION } from '../common/consts/app-keys.const'
import { useEditUrlParam } from '../common/hooks/edit-url-param'

  // const {isLoading, isError, data: fetchedTodos, error, refetch} = useQuery<{todos: ITodo[], totalTodos: number}>([
    //         APP_KEYS.QUERY_KEYS.TODOS, 
    //         query.get('search'), 
    //         query.get('status'),
    //         currentPage,
    //     ], () => todoService.getAllTodos({
    //                 search: query.get('search'), 
    //                 status: query.get('status'),
    //                 fromIndex: (currentPage - 1) * TODOS_ON_PAGINATION,
    //                 toIndex: currentPage * TODOS_ON_PAGINATION - 1
    //             }),
    //     {
    //         keepPreviousData: true
    //     }
    // )

const MyTodosContainer = () => {
    const history = useHistory()
    const query = useQueryParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [clickedPage, setClickedPage] = useState()
  
    const { isLoading: isTodosLoading, isError, data: queryData, fetchNextPage, error, refetch} = useInfiniteQuery<{ todos: ITodo[], totalTodos: number }[]>(
        {
            queryKey: [
                APP_KEYS.QUERY_KEYS.TODOS,
                query.get('search'),
                query.get('status')
            ],
            queryFn: ({pageParam = 1}) => {
                console.log('pageParam');
                return todoService.getAllTodos({
                    search: query.get('search'),
                    status: query.get('status'),
                    fromIndex: (pageParam - 1) * TODOS_ON_PAGINATION,
                    toIndex: pageParam * TODOS_ON_PAGINATION - 1
                })
            },
            getNextPageParam: (lastPage) => {
                if (clickedPage) return query.get(page)
                if (lastPage.hasNextPage) return lastPage.page + 1
            },
            refetchOnMount: true
        }
        )
    const todos = queryData?.pages.reduce((accumulator, currentValue) => {
        currentValue.todos.forEach(value => accumulator.push(value))
        return accumulator
    }, [])
    const pagedTodos = queryData?.pages
    console.log('pagedTodos',pagedTodos);
    const totalTodos = queryData?.pages[0].totalTodos

    console.log('todos', todos)
    const setClientTodos = useSetClientTodos()

    const onDeleteTodo = (id: string) => () => {
        todoService.deleteTodo(id).then(() => {
            // setClientTodos({action: 'DELETE', id})
            // refetch()
            refetch()
        })
    }
    const onCompleteTodo = (todo: ITodo) => () => {
        todoService.completeTodo(todo.id).then(() => {
            todo.isCompleted = true
            // setClientTodos({action: 'UPDATE', todo})
            // refetch()
            refetch()
        })
    }
    const editUrlParam = useEditUrlParam()

    const onFilterClick = (filter: string) => {
        editUrlParam('status', filter)
    }
    const onSearchChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        editUrlParam('search', value)
    }



    const [device, setDevice] = useState<DeviceResolution>('desktop')
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
        onResize()
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const onCurrentPage = (_: any, number: number) => {
        if (!todos) return 
        setCurrentPage(number)
        if (number > Math.floor(todos.length/10)) {
            // editUrlParam('page', number)
            fetchNextPage({pageParam: number })
        }
    }

    const pagesNumber = !totalTodos ? 0 : Math.ceil(totalTodos / TODOS_ON_PAGINATION)

    return (
        <TodosPageComponent
            device={device}
            todos={todos as ITodo[]}
            pagedTodos={pagedTodos}
            onCompleteTodo={onCompleteTodo}
            onDeleteTodo={onDeleteTodo}
            pagesNumber={pagesNumber}
            currentPage={currentPage}
            setCurrentPage={onCurrentPage}
            onFilterClick={onFilterClick}
            onSearchChange={onSearchChange}
            fetchNextPage={fetchNextPage}
            setClickedPage={setClickedPage}
            isTodosLoading={isTodosLoading}
        />
    )
}

export default MyTodosContainer

