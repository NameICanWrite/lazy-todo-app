import {createFromEntries} from './typescript'
import {getEntries} from './typescript'

export type Valids = Record<string, string | number | boolean>
export type ValidsRec = Record<string, Valids>

export type Values = Record<string, string | number | boolean>

const symbol = (number: number) => {
    const lastChar = number % 10
    if (lastChar === 1) {
        return ''
    } else {
        return 's'
    }
}

export const validateOne = (
    {value, validations, name, values}: {value: string, validations: Valids, name: string, values: Values }
) => {
    let error
    loop: for (let valName in validations) {
        let valValue = validations[valName]
        switch (valName) {
            case ('required'): {
                if (value === '' || value === null || value === undefined) {
                    error = 'This Field is required.'
                    break loop
                }
                break
            }
            case ('isEmail') : {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    error = 'Enter a valid email.'
                    break loop
                }
                break
            }
            case ('isNumber') : {
                if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                    error = 'Enter a number.'
                    break loop
                }
                break
            }
            case ('isNumberGreaterThanZero') : {
                if (!/(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)/.test(value)) {
                    error = 'Enter a number greater than zero.'
                    break loop
                }
                break
            }
            case ('isPhone') : {
                if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)) {
                    error = 'Enter a valid number.'
                    break loop
                }
                break
            }
            case ('equalToField') : {
                valValue = valValue as string
                if (value !== values?.[valValue]) {
                    error = `${name} and ${valValue} do not match.`
                    break loop
                }
                break
            }
            case ('minLength') : {
                const minLength = valValue as number
                const end = symbol(minLength)
                if (value.length < minLength) {
                    error = `The field length must not be less than ${minLength} symbol${end}.`
                    break loop
                }
                break
            }
            case ('maxLength') : {
                const maxLength = valValue as number
                const end = symbol(maxLength)
                if (value.length > maxLength) {
                    error = `The field length must be less than ${maxLength} symbol${end}.`
                }
            }
        }
    }
    return error
}

export const validateAll = (values: Values, validations: ValidsRec) => {
    const errors: Record<string, string> = {}
    let name: keyof typeof values
    for (name in values) {
        const value = values[name]
        if (typeof value === 'string') {
            const error = validateOne({value, validations: validations[name], name, values})
            if (error) {
                errors[name] = error
            }
        }
    }
    return errors
}