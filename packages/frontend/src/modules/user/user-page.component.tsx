import {Container} from './user-page.styled'
import {User} from '../common/types/user.types'
import {Email} from './user-page.styled'
import {Button} from '../common/components/button/button'
import {FC} from 'react'
import {Redirect} from 'react-router-dom'
import {APP_KEYS} from '../common/consts'
import {ForgetLabel} from './user-page.styled'
import {ForgetButton} from './user-page.styled'

type UserProps = {
    user: User | undefined,
    forgetPassword: () => void,
    isSuccess: boolean,
    logout: () => void
}

const UserPageComponent: FC<UserProps> = (props) => {
    const {user, forgetPassword, isSuccess, logout} = props
    
    return (
        <Container>
            {user ? (
                <>
                    <Email>
                        Email: {user.email}
                    </Email>
                    <ForgetLabel>
                        Change password
                    </ForgetLabel>
                    <ForgetButton onClick={forgetPassword}>
                        Reset
                    </ForgetButton>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                    {isSuccess && (
                        <Redirect to={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD}/>
                    )}
                </>
            ) : (
                <Redirect to={APP_KEYS.ROUTER_KEYS.MY_TODOS}/>
            )}
        </Container>
    )
}

export default UserPageComponent