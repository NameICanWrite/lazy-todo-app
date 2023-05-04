import styled from "styled-components"
import { COLORS, SPACES } from "../../../theme"

export const Container = styled('div')`
  width: 100%;
  margin-bottom: ${SPACES.sm}
`

export const InputField = styled.input.attrs((props) => ({
  name: props.name,
  value: props.value,
  onChange: props.onChange,
  type: props.type,
}))`
  width: 100%;
  border: 1px solid ${COLORS.veryLight};
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
  color: ${COLORS.lightGrey};
  pointer-events: none
`

export const ErrorComponent = styled.div<{error: string | null | undefined}>`
  color: ${COLORS.red};
  display: ${({error}) => error? 'block' : 'none'};
`