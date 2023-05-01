import styled from "styled-components"
import Checkbox from "../my-todos/switch-button/switch-button"
import { DEVICE, SPACES } from "../theme"

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: fit-content;
  margin: 0 auto;
  @media ${DEVICE.tablet} {
    width: 400px; 
  }
  @media ${DEVICE.smallTablet} {
    width: 100%;
    padding: ${SPACES.xxs}
  }
`
export const Button = styled('button')`
  display: block;
  width: 100%;
  height: 40px;
  cursor: pointer;
`
export const IsPrivate = styled(Checkbox)`
  margin-bottom: ${SPACES.xs};
`