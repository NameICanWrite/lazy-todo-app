import {useFormik} from 'formik'
import {ITodoCreate} from '../../common/types/todos.type'
import todoService from '../../../service/todos'
import {SignUpClientData} from '../../common/types/user.types'
import {validateAll} from '../../common/utils/validate'
import SignUpContainer from '../sign-up/sign-up.container'
import {useMutation} from 'react-query'
import userService from '../../../service/user'
import {INITIAL_VALUES} from './login.consts'
import LoginComponent from './login.component'
import {VALIDATIONS} from './login.consts'
import {LoginData} from '../../common/types/user.types'
import {useLogin} from '../../common/hooks/use-login'
import {User} from '../../common/types/user.types'

const LoginContainer = () => {
    const {mutate, isSuccess, data} = useMutation({
        mutationFn: async (loginData: LoginData) => {
            return userService.login(loginData)
        }
    })

    const login = useLogin()

    const formik = useFormik<LoginData>({
        initialValues: INITIAL_VALUES,
        onSubmit: async (loginData: LoginData) => {
            mutate(loginData, {
                    onSuccess: (user: User) => {
                        login(user)
                        formik.resetForm()
                    }
                }
            )
        },
        validate: (values) => {
            return validateAll(values, VALIDATIONS)
        },
        validateOnChange: true
    })

    return (
        <LoginComponent formik={formik} isSuccess={isSuccess}/>
    )
}

export default LoginContainer