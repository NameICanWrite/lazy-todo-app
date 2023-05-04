import {useQueryClient} from 'react-query'
import {User} from '../types/user.types'
import {APP_KEYS} from '../consts'
import {useEffect} from 'react'
import {useQuery} from 'react-query'
import userService from '../../../service/user'

export const useGetUser = () => {
    const {data: user, isSuccess, isError, isLoading} = useQuery<User>([APP_KEYS.QUERY_KEYS.GET_USER], () => {
        return userService.getUser()
    }, {retry: false})

    return {user, isSuccess, isError, isLoading}
}