
import CreateTodoFormContainer from '../../edit-and-create-todo/create-todo/create-todo-form.container'
import SignUpComponent from './sign-up.component'
import SignUpContainer from './sign-up.container'
import {Header} from '../auth.styled'

const SignUpPage = () => {

    return (
        <div>
            <Header>
                Sign Up
            </Header>
            <SignUpContainer/>
        </div>
    )
}

export default SignUpPage