import {Redirect} from 'react-router-dom'
import {FC} from 'react'
import {Form} from '../auth.styled'
import {AuthInput} from '../auth.styled'
import {Button} from '../../common/components/button/button'
import {SuccessMessage} from '../auth.styled'
import {Container} from '../auth.styled'
import {FormikProps} from 'formik'
import {useMutation} from 'react-query'
import {ResetPasswordServerData} from '../../common/types/user.types'
import userService from '../../../service/user'
import {useFormik} from 'formik'
import {ResetPasswordClientData} from '../../common/types/user.types'
import {validateAll} from '../../common/utils/validate'
import ResetPasswordComponent from '../reset-password/reset-password.component'
import ForgetPasswordComponent from './forget-password.component'
import {INITIAL_VALUES} from './forget-password.consts'
import {VALIDATIONS} from './forget-password.consts'
import {useQueryClient} from 'react-query'
import {APP_KEYS} from '../../common/consts'

const ForgetPasswordContainer = () => {
    const {mutate, isSuccess, data} = useMutation({
        mutationFn: async (email: string) => {
            return userService.forgetPassword(email)
        }
    })

    const formik = useFormik<{email: string}>({
        initialValues: INITIAL_VALUES,
        onSubmit: async ({email}: {email: string}) => {
            mutate(email, {
                    onSuccess: () => {
                        localStorage.setItem(APP_KEYS.STORAGE_KEYS.EMAIL, email)
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
        <ForgetPasswordComponent formik={formik} isSuccess={isSuccess}/>
    )
}

export default ForgetPasswordContainer