import { FC } from 'react'
import styled from 'styled-components'

export type SwitchButtonProps = {
  on: boolean,
  onSwitch: () => void,
  className?: string
}

const SwitchButton: FC<SwitchButtonProps> = ({ on, onSwitch, className }) => {
  console.log('on', on)
  
  return (
    <Button onClick={onSwitch} className={className ?? ''}>
      <Circle on={on} />
    </Button>
  )
}

export default SwitchButton

export const Button = styled('button')`
  width: 40px;
  /* display: flex;
  align-items: center; */
  padding: 0;
  height: 20px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: #6aa84f;
  position: relative;
`

export const Circle = styled('div') <{ on: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: white;
  transition: 0.4s all;
  position: absolute;
  top: 50%;
  left: ${({ on }) => (on ? '100%' : '0')};
  transition: 0.4s all;
  transform: translateX(${({ on }) => (on ? '-100%' : '0')}) translateY(-50%)
`