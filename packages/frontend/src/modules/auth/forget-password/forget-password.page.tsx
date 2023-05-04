import {Header} from '../auth.styled'
import ResetPasswordContainer from '../reset-password/reset-password.container'
import ForgetPasswordContainer from './forget-password.container'

const ForgetPasswordPage = () => {

    return (
        <div>
            <Header>
                Forget Password
            </Header>
            <ForgetPasswordContainer/>
        </div>
    )
}

export default ForgetPasswordPage