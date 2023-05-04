import {useFormik} from 'formik'
import {ITodoCreate} from '../../common/types/todos.type'
import todoService from '../../../service/todos'
import {INITIAL_VALUES} from './sign-up.consts'
import {useHistory} from 'react-router-dom'
import userService from '../../../service/user'
import {useMutation} from 'react-query'
import SignUpComponent from './sign-up.component'
import {SignUpClientData} from '../../common/types/user.types'
import {SignUpServerData} from '../../common/types/user.types'
import {validateAll} from '../../common/utils/validate'
import {VALIDATIONS} from './sign-up.consts'

const SignUpContainer = () => {
    const {mutate, status, isSuccess, isError, data} = useMutation({
        mutationFn: async (signUpData: SignUpServerData) => {
            return userService.sendSignupEmail(signUpData)
        }
    })

    const formik = useFormik<SignUpClientData>({
        initialValues: INITIAL_VALUES,
        onSubmit: async (signUpData: SignUpClientData) => {
            mutate(signUpData, {
                    onSuccess: () => {
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
        <SignUpComponent formik={formik} isSuccess={isSuccess}/>
    )
}

export default SignUpContainer