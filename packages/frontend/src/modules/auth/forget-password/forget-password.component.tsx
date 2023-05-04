import {Container} from '../auth.styled'
import {FormikProps} from 'formik'
import {FC} from 'react'
import {Form} from '../auth.styled'
import {AuthInput} from '../auth.styled'
import {Button} from '../../common/components/button/button'
import {Redirect} from 'react-router-dom'
import {APP_KEYS} from '../../common/consts'

type ForgetPasswordProps = {
    formik: FormikProps<{email: string}>,
    isSuccess: boolean
}

const ForgetPasswordComponent:FC<ForgetPasswordProps> = (props) => {
    const {formik, isSuccess} = props

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
                <Button type={'submit'}>
                    Submit
                </Button>
                {isSuccess && (
                    <Redirect to={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD}/>
                )}
            </Form>
        </Container>
    )
}

export default ForgetPasswordComponent