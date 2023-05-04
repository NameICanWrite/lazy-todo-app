import CreateTodoFormContainer from '../../edit-and-create-todo/create-todo/create-todo-form.container'
import {Header} from '../auth.styled'
import LoginContainer from './login.container'

const LoginPage = () => {

    return (
        <div>
            <Header>
                Login
            </Header>
            <LoginContainer/>
        </div>
    )
}

export default LoginPage