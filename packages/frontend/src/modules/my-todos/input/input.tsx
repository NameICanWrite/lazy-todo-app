import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

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
      <Error error={error}>
        {error}
      </Error>
    </Container >
  )
}

export default Input

export const Container = styled('div')`
  width: 100%;
  margin-bottom: 20px
`

export const InputField = styled.input.attrs((props) => ({
  name: props.name,
  value: props.value,
  onChange: props.onChange,
  type: props.type,
}))`
  width: 100%;
  border: 1px solid rgb(204, 204, 204);
`

export const TextAreaField = styled.textarea.attrs((props) => ({
  name: props.name,
  value: props.value,
  onChange: props.onChange,
}))`
  width: 100%;
  resize: none;
  height: 100px;
`

export const Label = styled('label').attrs((props) => ({
  htmlFor: props.htmlFor,
}))<{label: string | undefined}> `;
  display: ${({label}) => label? 'block' : 'none'};
`

export const Wrapper = styled('div')`
  position: relative;
`

export const Placeholder = styled('div')<{value: string | number, type?: string}>`
  position: absolute;
  top: ${({type}) => type === 'textarea' ? '15px' : '50%'};
  left: 3px;
  transform: ${({type}) => type === '' ? 'translateY(0)' : 'translateY(-50%)'};
  display: ${({value, placeholder}) => !value || !placeholder ? 'block' : 'none'};
  color: #92867a;
  pointer-events: none
`

export const Error = styled.div<{error: string | null | undefined}>`
  color: red;
  display: ${({error}) => error? 'block' : 'none'};
`