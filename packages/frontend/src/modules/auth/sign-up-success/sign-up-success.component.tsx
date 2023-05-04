import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {APP_KEYS} from './../../common/consts/index'
import {useQueryClient} from 'react-query'
import {useQuery} from 'react-query'
import userService from '../../../service/user'
import {Container} from '../auth.styled'

export type SignUpSuccess = {
    isSuccess: boolean,
}

const SignUpSuccessComponent: FC<SignUpSuccess> = (props) => {
    const {isSuccess} = props

    return (
        <Container>
            {isSuccess && (
                <Redirect to={APP_KEYS.ROUTER_KEYS.USER}/>
            )}
        </Container>
    )
}

export default SignUpSuccessComponent