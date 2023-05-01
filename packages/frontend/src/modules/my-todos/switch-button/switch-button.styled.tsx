import styled from "styled-components"
import { COLORS, SPACES } from "../../theme"

export const Container = styled('div')``

export const Label = styled('label').attrs((props) => ({
  htmlFor: props.htmlFor,
}))<{label: string | undefined}> `;
  display: ${({label}) => label? 'block' : 'none'};
  margin-bottom: ${SPACES.xxs};
`

export const Wrapper = styled('div')`
  width: 40px;
  padding: 0;
  height: 20px;
  border-radius: 50px;
  border: 2px solid ${COLORS.black};
  background-color: ${COLORS.lightGreen};
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
  border: 2px solid ${COLORS.black};
  background-color: ${COLORS.white};
  transition: 0.4s all;
  position: absolute;
  top: 50%;
  left: ${({ $on }) => $on ? '100%' : '0'};
  transition: 0.4s all;
  transform: translateX(${({ $on }) => ($on ? '-100%' : '0')}) translateY(-50%)
`