import {useQueryClient} from 'react-query'
import {useHistory} from 'react-router-dom'
import {User} from '../types/user.types'
import {APP_KEYS} from '../consts'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const history = useHistory()

    const login = (user: User) => {
        queryClient.setQueryData<User>(APP_KEYS.QUERY_KEYS.GET_USER, () => user)
        history.push(APP_KEYS.ROUTER_KEYS.USER)
    }

    return login
}