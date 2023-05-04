export const INITIAL_VALUES = {
    email: '',
    password: '',
    passwordConfirm: ''
}

export const VALIDATIONS = {
    email: {minLength: 5, maxLength: 30, isEmail: true},
    password: {minLength: 5, maxLength: 30, equalToField: 'passwordConfirm'},
    passwordConfirm: {minLength: 5, maxLength: 30}
}