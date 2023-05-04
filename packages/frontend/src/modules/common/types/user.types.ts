export type SignUpServerData = {
    email: string,
    password: string
}

export type SignUpClientData = {
    email: string,
    password: string,
    passwordConfirm: string
}

export type LoginData = {
    email: string,
    password: string
}

export type ForgetPasswordData = {
    email: string
}

export type User = {
    email: string,
    id: number
}

export type ResetPasswordServerData= {
    code: string,
    newPassword: string,
    email: string
}

export type ResetPasswordClientData = {
    code: string,
    newPassword: string,
    passwordConfirm: string,
}