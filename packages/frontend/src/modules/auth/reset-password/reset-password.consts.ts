export const INITIAL_VALUES = {
    code: '',
    newPassword: '',
    passwordConfirm: ''
}

export const VALIDATIONS = {
    code: {required: true},
    password: {minLength: 5, maxLength: 30, equalToField: 'passwordConfirm'},
    passwordConfirm: {minLength: 5, maxLength: 30}
}
