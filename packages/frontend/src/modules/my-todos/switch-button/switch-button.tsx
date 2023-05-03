import { ChangeEvent, FC, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../input/input'
import { CheckField, Circle, Container, Label, Wrapper } from './switch-button.styled'

export type SwitchButtonProps = {
  on: boolean,
  onSwitch: (event: ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  id?: string,
  name: string,
  label?: string
}

const SwitchButton: FC<SwitchButtonProps> = (props) => {
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

export default SwitchButton

