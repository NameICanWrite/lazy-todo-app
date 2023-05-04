import {User} from '../types/user.types'
import {useQueryClient} from 'react-query'
import {ITodo} from '../types/todos.type'
import {APP_KEYS} from '../consts'
import {useHistory} from 'react-router-dom'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const history = useHistory()

    const logout = () => {
        queryClient.setQueryData<User | undefined>(APP_KEYS.QUERY_KEYS.GET_USER, () => {
            return undefined
        })
        localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN)
        history.push(APP_KEYS.ROUTER_KEYS.MY_TODOS)
    }

    return logout
}