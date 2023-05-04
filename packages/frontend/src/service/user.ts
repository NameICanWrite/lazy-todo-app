import HttpService from './http'
import {ITodo} from '../modules/common/types/todos.type'
import {ITodoCreate} from '../modules/common/types/todos.type'
import {LoginData} from '../modules/common/types/user.types'
import {SignUpServerData} from '../modules/common/types/user.types'
import {ForgetPasswordData} from '../modules/common/types/user.types'
import {ResetPasswordServerData} from '../modules/common/types/user.types'
import {APP_KEYS} from '../modules/common/consts'

class UserService extends HttpService {
    constructor() {
        super()
    }

    sendSignupEmail(signUpData: SignUpServerData) {
        return this.post({
            url: 'user/send-signup-email',
            data: signUpData
        })
    }

    login(loginData: LoginData) {
        return this.post({
            url: `user/login`,
            data: loginData,
            recieveAuthHeader: true
        })
    }

    secureSignupToken(token: string) {
        return this.get({
            url: `user/secure-signup/${token}`,
        })
    }

    forgetPassword(email: string) {
        return this.post({
            url: `user/send-password-reset-code`,
            data: {email}
        })
    }

    resetPassword(data: ResetPasswordServerData) {
        return this.post({
            url: `user/reset-password`,
            data
        })
    }

    getUser() {
        return this.get({
            url: 'user/current',
        }, true)
    }
}

const userService = new UserService()

export default userService