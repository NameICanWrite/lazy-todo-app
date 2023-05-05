import CreateTodoFormContainer from './create-todo-form.container'
import {Header} from '../modify-todo-form.styled'
import {Typography} from '@mui/material'

const CreateTodoPage = () => {

    return (
        <div>
            <Header variant={'h1'}>
                Create Todo Page
            </Header>
            <CreateTodoFormContainer/>
        </div>
    )
}

export default CreateTodoPage