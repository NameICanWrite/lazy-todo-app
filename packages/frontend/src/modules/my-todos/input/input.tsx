import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { Container, ErrorComponent, InputField, Label, Placeholder, TextAreaField, Wrapper } from './input.styled'

export type OnInputChange = (event: ChangeEvent<HTMLInputElement>) => void
export type OnTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => void

export type InputProps = {
  placeholder?: string;
  name: string;
  value: string | number;
  className?: string;
  error?: string | null;
  label?: string;
  type?: string;
  onChange: OnTextAreaChange | OnInputChange;                                                                         
} 

const Input: FC<InputProps> = (props) => {
  const { placeholder, name, value, className, onChange, error, type, label} = props

  console.log('label', label)
  
  return (
    <Container>
      <Label label={label} htmlFor={name}>
        {label}
      </Label>
      <Wrapper>
        {type === 'textarea' ? (
          <TextAreaField
            name={name}
            value={value}
            onChange={onChange as OnTextAreaChange}
          />
        ) :  (
          <InputField
            name={name}
            value={value}
            onChange={onChange as OnInputChange}
            type = {type ?? 'text'}
          />
        )}
        <Placeholder value={value as string} type={type} placeholder={placeholder}>
          {placeholder}
        </Placeholder>
      </Wrapper>
      <ErrorComponent error={error}>
        {error}
      </ErrorComponent>
    </Container >
  )
}

export default Input

