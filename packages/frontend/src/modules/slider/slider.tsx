import { useEffect, useState, useRef, FC, Children, ReactNode, Fragment, useCallback } from 'react'
import styled from 'styled-components'
import { BackArrow, Container, Content, Elem, ForwardArrow, Track } from './slider.styled'

export type SliderProps = {
  perSlide: number,
  children: ReactNode,
  current?: number,
  setCurrent?: (index: number) => void,
  className?: string
}

export type MoveRef = {
  startX: number,
  moving: boolean,
  current: number,
  fast: boolean,
  clientX: number,
  blocking: boolean
}

const Slider: FC<SliderProps> = (props) => {

  const { children } = props
  const perSlide = props.perSlide ?? 1
  const [current, setCurrent] = useState(props.current ?? 0)
  const [elements, setElements] = useState(Children.toArray(children))
  const length = elements.length

  const slideRef = useRef<HTMLDivElement>(null)
  const [transition, setTransition] = useState('0.4s all')

  const getTransform = (current: number, translate: number) => `translateX(calc(${-100 * (current + length)}% + ${translate}px))`

  const [transform, setTransform] = useState(getTransform(current, 0))

  const onBack = () => {
    const value = getComputedStyle(slideRef.current as Element)
      .getPropertyValue('transform').split(', ')[4]

    if (transition === 'unset') {
      setTransition('0.4s all')
    }

    if (current === 0) {
      setCurrent(length)
      setTransform(getTransform(length, 0))
      setTransition('unset')
      return
    }

    setTransform(getTransform(current - 1, 0))
    setCurrent(current - 1)
  }

  const onForward = () => {
    const value = getComputedStyle(slideRef.current as Element)
      .getPropertyValue('transform').split(', ')[4]

    if (current === length - 1) {
      setCurrent(-1)
      setTransform(getTransform(-1, 0))
      setTransition('unset')
      return
    }

    setTransform(getTransform(current + 1, 0))
    setCurrent(current + 1)
  }

  const moveRef = useRef<MoveRef>(
    { startX: 0, moving: false, current: current, fast: false, clientX: 0, blocking: false }
  )
  const [moveState, setMoveState] = useState({ translate: 0, moving: false })

  const onUp = useCallback((event: MouseEvent | TouchEvent) => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('touchend', onUp)

    let clientX
    const mobileEvent = event as TouchEvent
    const descEvent = event as MouseEvent
    if (mobileEvent.changedTouches) {
      clientX = mobileEvent.changedTouches[0].clientX
    } else {
      event.preventDefault()
      clientX = descEvent.clientX
    }

    const translate = moveRef.current.startX - clientX
    const width = slideRef.current?.children[moveRef.current.current].getBoundingClientRect().width as number
    moveRef.current.moving = false

    let toMove: number
    if (moveRef.current.fast) {
      if (translate > 0) {
        toMove = Math.ceil(translate / width)
      } else {
        toMove = Math.floor(translate / width)
      }
    } else {
      toMove = Math.round(translate / width)
    }

    let current = moveRef.current.current + toMove

    if (current >= length || current < 0) {
      // console.log('length - current - 1', length - current - 1)
      setCurrent(length - current - 1)
      setTransform(getTransform(length - current - 1, -translate))
    } else {
      setCurrent(current)
      setTransform(getTransform(current, 0))
      // setMoveState({translate: 0, moving: false})
      setTransition('0.4s all')
    }
    // console.log('current', current)
  }, [])

  const onMove = useCallback((event: MouseEvent | TouchEvent) => {
    let clientX
    const mobileEvent = event as TouchEvent
    const descEvent = event as MouseEvent

    if (mobileEvent.touches) {
      clientX = mobileEvent.touches[0].clientX
    } else {
      clientX = descEvent.clientX
    }

    moveRef.current.blocking = true

    const translate = clientX - moveRef.current.startX
    moveRef.current.clientX = clientX
    setTransform(getTransform(moveRef.current.current, translate))
  }, [])

  const onDown = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    let clientX
    const mobileEvent = event as React.TouchEvent
    const descEvent = event as React.MouseEvent

    if (mobileEvent.touches) {
      clientX = mobileEvent.touches[0].clientX
    } else {
      clientX = descEvent.clientX
      event.preventDefault()
    }

    moveRef.current.clientX = clientX
    moveRef.current.startX = clientX
    moveRef.current.fast = true
    moveRef.current.moving = true

    setTimeout(() => {
      moveRef.current.fast = false
    }, 200)

    setTransition('unset')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onUp)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      if (current >= length) {
        setCurrent(length + length - current - 1)
        setTransform(getTransform(length + length - current - 1, 0))
        setTransition('0.4s all')
      }
      if (current <= -1) {
        setCurrent(-(current + 1))
        setTransition('0.4s all')
        setTransform(getTransform(-(current + 1), 0))
      }
      moveRef.current.current = current
    })
  }, [current])

  return (
    <Container>
      <BackArrow
        onClick={onBack}
      />
      <Content>
        <Track
          style={{ transform, transition }}
          ref={slideRef}
          onMouseDown={onDown}
          onTouchStart={onDown}
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
      </Content>
      <ForwardArrow
        onClick={onForward}
      />
    </Container>
  )
}

export default Slider

