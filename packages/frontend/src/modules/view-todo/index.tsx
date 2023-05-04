import {useHistory, useParams} from 'react-router-dom'
import todoService from '../../service/todos'
import {useQuery} from 'react-query'
import {ChangeEvent, useEffect} from 'react'
import styled from 'styled-components'
import {useOneTodo} from '../common/hooks/use-one-todo'
import {Description, EditButton, Header, Wrapper, DescriptionText, ButtonWrapper, BackButton} from './view-todo.styled'
import {Button} from '../my-todos/todo/todo.styled'
import {APP_KEYS} from '../common/consts'
import SwitchButton from '../my-todos/switch-button/switch-button'
import {useQueryClient} from 'react-query'
import {QUERY_KEYS} from '../common/consts/app-keys.const'
import {ITodo} from '../common/types/todos.type'
import {useSetClientTodos} from '../common/hooks/use-set-client-todos'
import { useGetUser } from '../common/hooks/use-get-user'

const ViewTodoPage = () => {
    const {todo} = useOneTodo()
    const history = useHistory()

    const {user: currentUser} = useGetUser()

    const setClientTodos = useSetClientTodos()

    const onCompleteTodo = () => (event: ChangeEvent<HTMLInputElement>) => {
        if (!todo || todo.isCompleted) return
        todoService.completeTodo(todo.id).then(() => {
            setClientTodos({action: 'UPDATE', todo})
        })
    }

    return (
        <>
            {todo && (
                <Wrapper>
                    <Header>
                        {todo?.name}
                    </Header>
                    <Description>
                        <DescriptionText>
                            {todo?.description}
                        </DescriptionText>
                    </Description>
                    <ButtonWrapper>
                        {todo.isCompleted ? 'Marked as completed' : 'Mark as complete'}
                        <SwitchButton
                            onSwitch={onCompleteTodo()}
                            on={todo.isCompleted ?? false}
                            name="isCompleted"
                        />
                    </ButtonWrapper>
                    {/* <Navigation> */}
                    {todo.user?.id == currentUser.id && <EditButton
                        onClick={() => history.push(`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/${todo.id}`)}
                    >
                        Edit
                    </EditButton>}
                    <BackButton
                        onClick={() => history.push(`${APP_KEYS.ROUTER_KEYS.MY_TODOS}`)}
                    >
                        Back
                    </BackButton>
                    {/* </Navigation>         */}
                </Wrapper>
            )}
        </>
    )
}


export default ViewTodoPage