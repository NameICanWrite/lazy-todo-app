import {useFormik} from 'formik'
import todoService from '../../../service/todos'
import {ITodoCreate} from '../../common/types/todos.type'
import {useHistory} from 'react-router-dom'
import {APP_KEYS} from '../../common/consts'
import {ITodo} from '../../common/types/todos.type'
import {useEffect} from 'react'
import ModifyTodoForm from '../modify-todo-form'

const EditTodoFormContainer = ({todo}: { todo: ITodo }) => {
    const history = useHistory()
    const formik = useFormik<ITodo>({
        initialValues: {
            name: todo.name,
            description: todo.description,
            isCompleted: todo.isCompleted,
            isPrivate: todo.isPrivate,
            id: todo.id
        },
        onSubmit: async (todo: ITodo) => {
            await todoService.editTodo(todo)
            history.push(APP_KEYS.ROUTER_KEYS.MY_TODOS)
        }
    })

    return (
        <ModifyTodoForm formik={formik}/>
    )
}

export default EditTodoFormContainer