import UserPageComponent from './user-page.component'
import {useGetUser} from '../common/hooks/use-get-user'
import {useMutation} from 'react-query'
import {LoginData} from '../common/types/user.types'
import userService from '../../service/user'
import {ForgetPasswordData} from '../common/types/user.types'
import {useLogout} from '../common/hooks/use-logout'
import {User} from '../common/types/user.types'
import {APP_KEYS} from '../common/consts'

const UserPageContainer = () => {
    const {user} = useGetUser()

    const {mutate, isSuccess} = useMutation({
        mutationFn: async (user: User) => {
            userService.forgetPassword(user.email)
        }
    })
    
    const forgetPassword = () => {
        if (!user) return
        mutate(user, {
            onSuccess: () => {
                localStorage.setItem(APP_KEYS.STORAGE_KEYS.EMAIL, user.email)
            }
        })
    }

    const logout = useLogout()

    return (
        <UserPageComponent
            user={user}
            forgetPassword={forgetPassword}
            isSuccess={isSuccess}
            logout={logout}
        />
    )
}

export default UserPageContainer