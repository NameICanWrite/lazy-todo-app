import Input from '../../common/components/input/input'
import { FormikProps } from 'formik'
import { FC } from 'react'
import { SignUpClientData } from '../../common/types/user.types'
import { AuthButtonContainer, Form } from '../auth.styled'
import { Container } from '../auth.styled'
import { SuccessMessage } from '../auth.styled'
import { Button } from '../../common/components/button/button'
import { AuthInput } from '../auth.styled'
import { LoginData } from '../../common/types/user.types'
import { Redirect, useHistory } from 'react-router-dom'
import { APP_KEYS } from '../../common/consts'
import { ForgetLink, SignUpLink } from '../../my-todos/links/links.styled'

export type LoginProps = {
    formik: FormikProps<LoginData>,
    isSuccess: boolean
}

const LoginComponent: FC<LoginProps> = (props) => {
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
                <AuthButtonContainer>
                    <Button>
                        Submit
                    </Button>
                    <Button onClick={() => history.push(APP_KEYS.ROUTER_KEYS.SIGNUP)}>
                        Sign up
                    </Button>
                </AuthButtonContainer>

                <ForgetLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD)}>
                    Forgot password?
                </ForgetLink>
            </Form>
        </Container>
    )
}

export default LoginComponent

