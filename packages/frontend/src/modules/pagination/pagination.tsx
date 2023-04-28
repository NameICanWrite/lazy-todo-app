import styled, { css } from 'styled-components'
import { ChangeEvent, FC, MouseEvent } from 'react'

export type PaginationProps = {
  className?: string,
  currentPage: number,
  pagesNumber: number,
  setCurrentPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, pagesNumber, setCurrentPage } = props

  const onPage = (event: MouseEvent<HTMLElement>) => {
    const currentPage = +(event.currentTarget.getAttribute('name') as string)
    setCurrentPage(currentPage)
  }

  const onBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const onForward = () => {
    if (currentPage < pagesNumber) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Container>
      <MoveButton className={'pagination__elem pagination__back'} onClick={onBack}>
        &lt;
      </MoveButton>
      <Number number={1} currentPage={currentPage} onPage={onPage} />
      {pagesNumber > 5 && (currentPage > 3) && (
        <Ellipsis />
      )}
      {(currentPage < 4 ? (
        [2, 3, 4]
      ) : currentPage > pagesNumber - 3 ? (
        [pagesNumber - 3, pagesNumber - 2, pagesNumber - 1]
      ) : (
        [currentPage - 1, currentPage, currentPage + 1]
      )).map((number) => number < pagesNumber && (
        <Number
          key={number}
          number={number}
          currentPage={currentPage}
          onPage={onPage}
        />
      ))}
      {pagesNumber > 5 && (currentPage < pagesNumber - 2) && (
        <Ellipsis />
      )}
      {pagesNumber > 1 && (
        <Number
          number={pagesNumber}
          currentPage={currentPage}
          onPage={onPage}
        />
      )}
      <MoveButton onClick={onForward}>
        &gt;
      </MoveButton>
    </Container>
  )
}

export default Pagination

export const Container = styled('div')`
  display: flex;
  border-radius: 2px;
  z-index: 10;
  bottom: 0;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 40px
`

export const ElemStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  border: 2px solid #d2d2d2;
  margin: 0 4px;
  font-size: 12px;
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
  color: #4f4f4f;
  font-size: 14px;
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
  background-color: black;
  color: white;
  border-color: black;
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
  background-color: black;
  margin: 8px 2px 0 2px;
  width: 1.44px;
  height: 1.44px;
  border-radius: 50px;
`

