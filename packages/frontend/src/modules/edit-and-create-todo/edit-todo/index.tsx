import {useParams} from 'react-router-dom'
import todoService from '../../../service/todos'
import {useQuery} from 'react-query'
import EditTodoForm from '../modify-todo-form'
import {useEffect} from 'react'
import EditTodoFormContainer from './edit-todo-form.container'
import {useOneTodo} from '../../common/hooks/use-one-todo'
import styled from 'styled-components'
import {SPACES} from '../../theme'
import {FONT_SIZES} from '../../theme/fonts.const'
import {Header} from '../modify-todo-form.styled'

const EditTodoPage = () => {
    const {todo} = useOneTodo()

    return (
        <div>
            <Header>
                Edit Todo Page
            </Header>
            {todo && <EditTodoFormContainer todo={todo}/>}
        </div>
    )
}

export default EditTodoPage

