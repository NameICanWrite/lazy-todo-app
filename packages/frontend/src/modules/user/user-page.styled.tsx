import styled from 'styled-components'
import {SPACES} from '../theme'
import {Button} from '../common/components/button/button'
import {BREAKPOINTS} from '../theme'

export const Container = styled('div')`
  padding: ${SPACES.lg};
  @media (max-width: ${`${BREAKPOINTS.tablet}px`}) {
    padding: ${SPACES.sm};
  }
`

export const Email = styled('div')`
  display: block;
  margin-bottom: ${SPACES.sm};
`

export const ForgetLabel = styled('div')``

export const ForgetButton = styled(Button)`
  margin-bottom: ${SPACES.sm};
`