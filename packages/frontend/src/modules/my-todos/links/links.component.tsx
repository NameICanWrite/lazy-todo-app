import {FC} from 'react'
import {useHistory} from 'react-router-dom'
import {User} from '../../common/types/user.types'
import {APP_KEYS} from '../../common/consts'
import {UserLink} from './links.styled'
import {SignUpLink} from './links.styled'
import {LinksWrapper} from './links.styled'
import {LoginLink} from './links.styled'
import {ForgetLink} from './links.styled'

export type LinksProps = {
    user: User | undefined
}

const LinksComponent: FC<LinksProps> = (props) => {
    const {user} = props
    const history = useHistory()

    return (
        <>
            {user ? (
                <UserLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.USER)}>
                    User
                </UserLink>
            ) : (
                <>
                    <LinksWrapper>
                        <LoginLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.LOGIN)}>
                            Login
                        </LoginLink>
                        <SignUpLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.SIGNUP)}>
                            Sign up
                        </SignUpLink>
                    </LinksWrapper>
                    <ForgetLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD)}>
                        Forgot password?
                    </ForgetLink>
                </>
            )}
        </>
    )
}

export default LinksComponent