import styled from 'styled-components'
import Input from '../common/components/input/input'
import {Typography} from '@mui/material'
import {SPACES} from '../theme'
import {FONT_SIZES} from '../theme/fonts.const'

export const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${SPACES.lg}
`

export const Form = styled('form')`
  width: 500px;
  @media(max-width: 768px) {
    width: 90%;
  }
`
export const InputField = styled(Input)``

export const SuccessMessage = styled('div')``

export const Header = styled(Typography)`
  font-size: 60%;
  margin-top: ${SPACES.md};
  margin-bottom: ${SPACES.sm};
  text-align: center;
`

export const AuthInput = styled(Input)`
    input {
      height: 40px;
    }
`
export const AuthButtonContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 230px;

`