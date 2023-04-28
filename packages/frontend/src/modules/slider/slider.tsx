import { useEffect, useState, useRef, FC, Children, ReactNode, Fragment } from 'react'
import styled from 'styled-components'

export type SliderProps = {
  perSlide: number,
  children: ReactNode,
  current?: number,
  setCurrent?: (index: number) => void,
  className?: string
}

const Slider: FC<SliderProps> = (props) => {

  const { children, className } = props

  const perSlide = props.perSlide ?? 1

  const [current, setCurrent] = useState(props.current ?? 0)

  const [elements, setElements] = useState(Children.toArray(children))

  const length = elements.length

  const slideRef = useRef<HTMLDivElement>(null)

  const [transition, setTransition] = useState('0.4s all')

  const elementsWidthRef = useRef(0)

  useEffect(() => {
    elementsWidthRef.current =
      Array.from(slideRef.current?.children as HTMLCollection).reduce((width, elem) => {
        const index = + (elem.getAttribute('data-value') as string)
        if (index >= 0 && index < length) {
          width += elem.getBoundingClientRect().width
        }
        return width
      }, 0)
  }, [])

  const onBack = () => {
    const value = getComputedStyle(slideRef.current as Element)
      .getPropertyValue('transform').split(', ')[4]

    console.log('current', current)
    console.log('value', value)

    if (transition === 'unset') {
      setTransition('0.4s all')
    }

    if (current === 0) {
      setCurrent(length)
      setTransition('unset')
      // transformRef.current = `translateX(-${value+elementsWidthRef.current}px)`
      return
    }

    setCurrent(current - 1)
  }

  const onForward = () => {
    const value = getComputedStyle(slideRef.current as Element)
      .getPropertyValue('transform').split(', ')[4]

    if (current === length - 1) {
      setCurrent(0)
      setTransition('unset')
      // transformRef.current = `translateX(-${value}px)`
      return
    }

    setCurrent(current + 1)
  }

  useEffect(() => {
    if (current === length) {
      setCurrent(length - 1)
      setTransition('0.4s all')
    }
  }, [current])

  const transformRef = useRef('')

  const transform = transformRef.current ? transformRef.current : `translateX(-${100 * (current)}%)`

  return (
    <Container>
      <BackArrow
        onClick={onBack}
      />
      <Track
        style={{ transform, transition }}
        ref={slideRef}
      // onMouseDown={onDown}
      // onTouchStart={onDown}
      // onClickCapture={onCapture}
      >
        {[-1, 0, 1].map(count => (
          <Fragment key={count}>
            {elements.map((childElement, index) => (
              <Elem
                key={count * length + index}
                data-value={count * length + index}
              >
                {childElement}
              </Elem>
            ))}
          </Fragment>
        ))}
      </Track>
      <ForwardArrow
        onClick={onForward}
      />
    </Container>
  )
}

export default Slider

export const Container = styled('div')`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none
  }
`

export const Track = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
  transition: 0.5s all
`

export const Elem = styled('div')`
  flex-shrink: 0;
  width: 100%
`

export const Arrow = styled('div')`
  cursor: pointer;
  background-color: transparent;
  border: none;
  height: 20px;
  width: 15px;
  position: absolute;
  padding: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  &:after, &:before {
    content: '';
    background-color: #868686;
    width: 12px;
    height: 1px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    position: absolute;
  }
`

export const BackArrow = styled(Arrow)`
  left: 5px;
  &:before{
    transform: translateY(calc(-50% - 4.3px)) translateX(-50%) rotate(-45deg)
  }
  &:after{
    transform: translateY(calc(-50% + 4.3px)) translateX(-50%) rotate(45deg)
  }
`

export const ForwardArrow = styled(Arrow)`
  right: 5px;
  &:before{
    transform: translateY(calc(-50% - 4.3px)) translateX(-50%) rotate(45deg)
  }
  &:after {
    transform: translateY(calc(-50% + 4.3px)) translateX(-50%) rotate(-45deg)
  }
`