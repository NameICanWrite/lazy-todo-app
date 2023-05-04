import styled from 'styled-components'
import {SPACES} from '../../theme'
import {Button} from '../../common/components/button/button'

export const LinksWrapper = styled('div')`
  margin-top: ${SPACES.sm};
  display: flex;
`

export const LoginLink = styled(Button)`
  margin-right: ${SPACES.xs};
`

export const SignUpLink = styled(Button)``

export const ForgetLink = styled('button')`
  display: inline-block ;
  width: auto;
  background-color: transparent;
  border: none;
  margin-top: ${SPACES.xs};
  cursor: pointer;
`

export const UserLink = styled(Button)``