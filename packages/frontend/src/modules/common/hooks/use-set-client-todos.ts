import {QueryClientAction} from '../types/query-actions.types'
import {ITodo} from '../types/todos.type'
import {useQueryClient} from 'react-query'
import todo from '../../my-todos/todo/todo'
import {APP_KEYS} from '../consts'

export const useSetClientTodos = () => {
    const queryClient = useQueryClient()

    return (params: { todo: ITodo, action: 'UPDATE' } | { id: string, action: 'DELETE' }) => {
        const {action} = params
        queryClient.setQueriesData<ITodo[]>(APP_KEYS.QUERY_KEYS.TODOS, (prevTodos) => {
            if (!prevTodos) {
                return []
            }
            if (action === 'UPDATE') {
                const {todo} = params
                console.log('todo', todo)
                const index = prevTodos.findIndex((elem) => elem.id === todo.id)
                prevTodos[index] = todo
            }
            if (action === 'DELETE') {
                const {id} = params
                const index = prevTodos.findIndex((elem) => elem.id === id)
                prevTodos.splice(index, 1)
            }
            return prevTodos
        })
    }
}