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



const MyTodosContainer = () => {
    const history = useHistory()
    const query = useQueryParams()
    const [currentPage, setCurrentPage] = useState(1)
  
    const { isLoading: isTodosLoading, isError, data: queryData, fetchNextPage, error, refetch} = useInfiniteQuery<
    { todos: ITodo[], totalTodos: number, hasNextPage: boolean, page: number }>(
        {
            queryKey: [
                APP_KEYS.QUERY_KEYS.TODOS,
                query.get('search'),
                query.get('status')
            ],
            queryFn: ({pageParam = 1}) => {
                return todoService.getAllTodos({
                    search: query.get('search'),
                    status: query.get('status'),
                    fromIndex: (pageParam - 1) * TODOS_ON_PAGINATION,
                    toIndex: pageParam * TODOS_ON_PAGINATION - 1
                })
            },
            getNextPageParam: (lastPage) => {
                if (lastPage.hasNextPage) return lastPage.page + 1
            },
            refetchOnMount: true
        }
        )
    const todos = queryData?.pages.reduce<ITodo[]>((accumulator, currentValue) => {
        currentValue.todos.forEach(value => accumulator.push(value))
        return accumulator
    }, [])
    const pagedTodos = queryData?.pages
    const totalTodos = queryData?.pages[0].totalTodos
    const setClientTodos = useSetClientTodos()

    const onDeleteTodo = (id: string) => () => {
        todoService.deleteTodo(id).then(() => {
            refetch()
        })
    }
    const onCompleteTodo = (todo: ITodo) => () => {
        todoService.completeTodo(todo.id).then(() => {
            todo.isCompleted = true
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
            fetchNextPage({pageParam: number })
        }
    }

    const pagesNumber = !totalTodos ? 0 : Math.ceil(totalTodos / TODOS_ON_PAGINATION)

    return (
        <TodosPageComponent
            device={device}
            todos={todos}
            pagedTodos={pagedTodos}
            onCompleteTodo={onCompleteTodo}
            onDeleteTodo={onDeleteTodo}
            pagesNumber={pagesNumber}
            currentPage={currentPage}
            setCurrentPage={onCurrentPage}
            onFilterClick={onFilterClick}
            onSearchChange={onSearchChange}
            fetchNextPage={fetchNextPage}
            isTodosLoading={isTodosLoading}
        />
    )
}

export default MyTodosContainer

