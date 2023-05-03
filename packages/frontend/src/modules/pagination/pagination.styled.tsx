import { FC, MouseEvent } from "react"
import styled, { css } from "styled-components"
import { COLORS } from "../theme"
import { FONT_SIZES } from "../theme/fonts.const"

export const Container = styled('div')`
  display: flex;
  border-radius: 2px;
  z-index: 10;
  bottom: 0;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white};
  height: 40px
`

export const ElemStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.grey};
  border: 2px solid ${COLORS.veryLight};;
  margin: 0 4px;
  font-size: ${FONT_SIZES.small};
  height: 25px;
  width: 25px;
`

export const Elem = styled('div')`
  ${ElemStyles}
`

export const Button = styled('button')`
  ${ElemStyles}
`

export const MoveButton = styled(Button)`
  color: ${COLORS.lightGrey};
  font-size: ${FONT_SIZES.small};
`

export type NumberProps = {
  number: number,
  currentPage: number,
  onPage: (event: MouseEvent<HTMLElement>) => void
}

export const Number: FC<NumberProps> = (props) => {
  const { number, currentPage, onPage } = props

  return (
    <>
      {currentPage !== number ? (
        <Button
          onClick={onPage}
          name={`${number}`}
        >
          {number}
        </Button>
      ) : (
        <CurrentPage>
          {currentPage}
        </CurrentPage>
      )}
    </>
  )
}

export const CurrentPage = styled(Button)`
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  border-color: ${COLORS.black};
`

export const Ellipsis: FC = () => {
  
  return (
    <EllipsisContainer>
      <EllipsisElem />
      <EllipsisElem />
      <EllipsisElem />
    </EllipsisContainer>
  )
}

export const EllipsisContainer = styled(Elem)`
  border: none;
  width: auto;
`

export const EllipsisElem = styled('div')`
  background-color: ${COLORS.black};
  margin: 8px 2px 0 2px;
  width: 1.44px;
  height: 1.44px;
  border-radius: 50px;
`