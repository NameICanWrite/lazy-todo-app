import CreateTodoFormContainer from './create-todo-form.container'
import {Header} from '../modify-todo-form.styled'
import {Typography} from '@mui/material'

const CreateTodoPage = () => {

    return (
        <div>
            <Header>
                Create Todo Page
            </Header>
            {/*<Header></Header>*/}
            <CreateTodoFormContainer/>
        </div>
    )
}

export default CreateTodoPage