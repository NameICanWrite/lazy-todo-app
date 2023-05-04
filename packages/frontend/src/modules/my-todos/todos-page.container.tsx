import axios from 'axios'
import React, {useEffect, useState, useMemo, useLayoutEffect, useRef, useCallback, ChangeEvent} from 'react'
import {useQuery} from 'react-query'
import Todo from './todo/todo'
import {ITodo} from '../common/types/todos.type'
import todoService from '../../service/todos'
import {useHistory, useLocation} from 'react-router-dom'
import {APP_KEYS} from '../common/consts'
import styled from 'styled-components'
import SwitchButton from './switch-button/switch-button'
import Pagination from '../pagination/pagination'
import {useRadioGroup} from '@mui/material'
import TodosPageComponent from './todos-page.component'
import {BREAKPOINTS} from '../theme'
import {useSetClientTodos} from '../common/hooks/use-set-client-todos'
import {DeviceResolution} from '../common/types/devices.types'
import { useQueryParams } from '../common/hooks/useQueryParams'
import {User} from '../common/types/user.types'
import {useQueryClient} from 'react-query'
import userService from '../../service/user'


const MyTodosContainer = () => {
    const history = useHistory()
    const query = useQueryParams()

    const {isLoading, isError, data: fetchedTodos, error, refetch} = useQuery<{todos: ITodo[], totalTodos: number}>([
            APP_KEYS.QUERY_KEYS.TODOS, 
            query.get('search'), 
            query.get('status')
        ], () =>
            todoService.getAllTodos({search: query.get('search'), status: query.get('status')
    }),
    )
    const todos = fetchedTodos?.todos
    const totalTodos = fetchedTodos?.totalTodos

    const setClientTodos = useSetClientTodos()

    const onDeleteTodo = (id: string) => () => {
        todoService.deleteTodo(id).then(() => {
            // setClientTodos({action: 'DELETE', id})
            refetch()
        })
    }
    const onCompleteTodo = (todo: ITodo) => () => {
        todoService.completeTodo(todo.id).then(() => {
            todo.isCompleted = true
            // setClientTodos({action: 'UPDATE', todo})
            refetch()
        })
    }
    const editUrlParam = (key: string, value: string) => {
        let params: Record<string, string> = {}
        query.delete(key)
        query.forEach((value, key) => {
            params[key] = value
        })
        if (value) params[key] = value
       
        const queryString = new URLSearchParams({...params})
        history.push({search: `?${queryString}`}) 
    }

    const onFilterClick = (filter: string) => {
        editUrlParam('status', filter) 
    }
    const onSearchChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
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
        refetch()
        onResize()
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1)

    const onCurrentPage = (_: any, number: number) => {
        setCurrentPage(number)
    }

    const pagesNumber = !todos ? 0 : Math.ceil(todos.length / 10)

    return (
        <TodosPageComponent
            device={device}
            todos={todos as ITodo[]}
            onCompleteTodo={onCompleteTodo}
            onDeleteTodo={onDeleteTodo}
            pagesNumber={pagesNumber}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onFilterClick={onFilterClick}
            onSearchChange={onSearchChange}
        />
    )
}

export default MyTodosContainer

