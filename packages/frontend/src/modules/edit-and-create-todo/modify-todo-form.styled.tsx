import styled from "styled-components"
import SwitchButton from "../my-todos/switch-button/switch-button"
import { DEVICE, SPACES } from "../theme"
import {FONT_SIZES} from '../theme/fonts.const'
import {Typography} from '@mui/material'

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
export const IsPrivate = styled(SwitchButton)`
  margin-bottom: ${SPACES.xs};
`
export const Header = styled(Typography)`
  display: none;
  font-size: ${FONT_SIZES.l};
  text-align: center;
  margin-top: ${SPACES.l};
`

