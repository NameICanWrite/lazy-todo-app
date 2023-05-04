import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import userService from '../../../service/user'
import {Redirect} from 'react-router-dom'
import {APP_KEYS} from './../../common/consts/index'
import SignUpSuccessComponent from './sign-up-success.component'
import {useQueryClient} from 'react-query'

const SignUpSuccessContainer = () => {
    const {token}: {token: string} = useParams()
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, `JWT ${token}`)

    const {isSuccess} = useQuery(APP_KEYS.QUERY_KEYS.GET_USER, () => {
        return userService.getUser()
    })

    console.log('isSuccess', isSuccess)

    return (
        <SignUpSuccessComponent isSuccess={isSuccess}/>
    )
}

export default SignUpSuccessContainer