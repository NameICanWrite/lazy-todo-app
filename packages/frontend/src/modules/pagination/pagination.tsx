import styled, {css} from 'styled-components'
import {ChangeEvent, FC, MouseEvent} from 'react'
import {Container, Ellipsis, MoveButton, Number} from './pagination.styled'

export type PaginationProps = {
    className?: string,
    currentPage: number,
    pagesNumber: number,
    setCurrentPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = (props) => {
    const {currentPage, pagesNumber, setCurrentPage} = props

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
            <Number number={1} currentPage={currentPage} onPage={onPage}/>
            {pagesNumber > 5 && (currentPage > 3) && (
                <Ellipsis/>
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
                <Ellipsis/>
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



