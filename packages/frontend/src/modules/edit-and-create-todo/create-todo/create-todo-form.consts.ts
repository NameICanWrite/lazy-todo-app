export const INITIAL_VALUES = {
    name: '',
    description: '',
    isCompleted: false,
    isPrivate: false,
}

export const VALIDATIONS = {
    name: {minLength: 5, maxLength: 30},
    description: {minLength: 5, maxLength: 30},
}