import {useFormik} from 'formik'
import todoService from '../../../service/todos'
import {ITodo, ITodoCreate} from '../../common/types/todos.type'
import {useHistory} from 'react-router-dom'
import {APP_KEYS} from '../../common/consts'
import ModifyTodoForm from '../modify-todo-form'
import {INITIAL_VALUES} from './create-todo-form.consts'

const CreateTodoFormContainer = () => {
    const history = useHistory()

    const formik = useFormik<ITodoCreate>({
        initialValues: INITIAL_VALUES,
        onSubmit: async (todo: ITodoCreate) => {
            await todoService.createTodo(todo)
            history.push(APP_KEYS.ROUTER_KEYS.MY_TODOS)
            formik.resetForm()
        },
    })

    return (
        <ModifyTodoForm formik={formik}/>
    )
}

export default CreateTodoFormContainer