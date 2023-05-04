export const INITIAL_VALUES = {
    email: '',
    password: ''
}

export const VALIDATIONS = {
    email: {minLength: 5, maxLength: 30, isEmail: true},
    password: {minLength: 5, maxLength: 30},
}