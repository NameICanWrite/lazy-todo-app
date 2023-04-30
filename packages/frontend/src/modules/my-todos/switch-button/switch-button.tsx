import { ChangeEvent, FC, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../input/input'

export type CheckboxProps = {
  on: boolean,
  onSwitch: (event: ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  id?: string,
  name: string,
  label?: string
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { on, onSwitch, className, id, name, label } = props
  return (
    <Container className={className ?? ''}>
      <Label label={label} htmlFor={name}>
        {label}
      </Label>
      <Wrapper>
        <Circle $on={on} />
        <CheckField
          name={name}
          value={name}
          checked={on}
          onChange={onSwitch}
        />
      </Wrapper>
    </Container>
  )
}

export default Checkbox

export const Container = styled('div')``

export const Label = styled('label').attrs((props) => ({
  htmlFor: props.htmlFor,
}))<{label: string | undefined}> `;
  display: ${({label}) => label? 'block' : 'none'};
  margin-bottom: 5px;
`

export const Wrapper = styled('div')`
  width: 40px;
  padding: 0;
  height: 20px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: #6aa84f;
  position: relative;
`
export const CheckField = styled.input.attrs(props => ({
  name: props.name,
  type: 'checkbox'
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  opacity: 0;
`

export const Circle = styled('div') <{ $on: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: white;
  transition: 0.4s all;
  position: absolute;
  top: 50%;
  left: ${({ $on }) => $on ? '100%' : '0'};
  transition: 0.4s all;
  transform: translateX(${({ $on }) => ($on ? '-100%' : '0')}) translateY(-50%)
`