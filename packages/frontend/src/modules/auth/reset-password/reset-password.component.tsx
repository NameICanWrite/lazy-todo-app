import {Container} from '../auth.styled'
import {FormikProps} from 'formik'
import {FC} from 'react'
import {Form} from '../auth.styled'
import {AuthInput} from '../auth.styled'
import {Button} from '../../common/components/button/button'
import {Redirect} from 'react-router-dom'
import {ResetPasswordClientData} from '../../common/types/user.types'

type ResetPasswordProps = {
    formik: FormikProps<ResetPasswordClientData>,
    isSuccess: boolean
}

const ResetPasswordComponent:FC<ResetPasswordProps> = (props) => {
    const {formik, isSuccess} = props

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <AuthInput
                    value={formik.values.code}
                    name={'code'}
                    error={formik.errors.code}
                    label={'Code from email'}
                    placeholder={'Enter code'}
                    onChange={formik.handleChange}
                />
                <AuthInput
                    value={formik.values.newPassword}
                    name={'newPassword'}
                    error={formik.errors.newPassword}
                    label={'Password'}
                    type={'password'}
                    placeholder={'Enter password'}
                    onChange={formik.handleChange}
                />
                <AuthInput
                    value={formik.values.passwordConfirm}
                    name={'passwordConfirm'}
                    error={formik.errors.passwordConfirm}
                    label={'Password confirm'}
                    type={'password'}
                    placeholder={'Enter password confirm'}
                    onChange={formik.handleChange}
                />
                <Button type={'submit'}>
                    Submit
                </Button>
                {isSuccess && (
                    <Redirect to={'/'}/>
                )}
            </Form>
        </Container>
    )
}

export default ResetPasswordComponent