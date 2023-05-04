import {useMutation} from 'react-query'
import {SignUpServerData} from '../../common/types/user.types'
import userService from '../../../service/user'
import {useFormik} from 'formik'
import {SignUpClientData} from '../../common/types/user.types'
import {validateAll} from '../../common/utils/validate'
import SignUpComponent from '../sign-up/sign-up.component'
import ResetPasswordComponent from './reset-password.component'
import {ResetPasswordServerData} from '../../common/types/user.types'
import {INITIAL_VALUES} from './reset-password.consts'
import {ResetPasswordClientData} from '../../common/types/user.types'
import {VALIDATIONS} from './reset-password.consts'
import {useQueryClient} from 'react-query'
import {APP_KEYS} from '../../common/consts'

const ResetPasswordContainer = () => {
    const {mutate, isSuccess, data} = useMutation({
        mutationFn: async (resetPasswordData: ResetPasswordServerData) => {
            return userService.resetPassword(resetPasswordData)
        }
    })

    const queryClient = useQueryClient()

    const formik = useFormik<ResetPasswordClientData>({
        initialValues: INITIAL_VALUES,
        onSubmit: async (resetPasswordData: ResetPasswordClientData) => {
            const {code, newPassword} = resetPasswordData
            const email = localStorage.getItem(APP_KEYS.STORAGE_KEYS.EMAIL)
            if (!email) return
            mutate({code, newPassword, email}, {
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
        <ResetPasswordComponent formik={formik} isSuccess={isSuccess}/>
    )
}

export default ResetPasswordContainer