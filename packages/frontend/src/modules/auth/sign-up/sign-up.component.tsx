import Input from '../../common/components/input/input'
import { FormikProps } from 'formik'
import { FC } from 'react'
import { SignUpClientData } from '../../common/types/user.types'
import { AuthButtonContainer, Form } from '../auth.styled'
import { Container } from '../auth.styled'
import { SuccessMessage } from '../auth.styled'
import { Button } from '../../common/components/button/button'
import { AuthInput } from '../auth.styled'
import { FetchStatus } from '../../common/types/status'
import { useHistory } from 'react-router-dom'
import { APP_KEYS } from '../../common/consts'

export type SignUpProps = {
    formik: FormikProps<SignUpClientData>,
    isSuccess: boolean
}


const SignUpComponent: FC<SignUpProps> = (props) => {
    const { formik, isSuccess } = props
    const history = useHistory()
    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <AuthInput
                    value={formik.values.email}
                    name={'email'}
                    error={formik.errors.email}
                    label={'Email'}
                    type={'email'}
                    placeholder={'Enter email'}
                    onChange={formik.handleChange}
                />
                <AuthInput
                    value={formik.values.password}
                    name={'password'}
                    error={formik.errors.password}
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
                <AuthButtonContainer>
                    <Button type={'submit'}>
                        Submit
                    </Button>
                    <Button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.LOGIN)}>
                        Log in
                    </Button>
                </AuthButtonContainer>

                {isSuccess && (
                    <SuccessMessage>
                        Visit provided email to confirm your account!
                    </SuccessMessage>
                )}
            </Form>
        </Container>
    )
}

export default SignUpComponent

