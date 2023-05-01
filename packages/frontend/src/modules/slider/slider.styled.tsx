import styled from "styled-components"
import { COLORS } from "../theme"

export const Container = styled('div')`
  width: 100%;
  position: relative;
  border: 2px solid ${COLORS.black};
`

export const Content = styled('div')`
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
  align-items: start;
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const BackArrow = styled(Arrow)`
  left: -40px;
  z-index: 10;
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid ${COLORS.black};
  }
  &:before{
    left: 0;
  }
  &:after{
    left: 2px;
    border-right-color: ${COLORS.white}
  }
`

export const ForwardArrow = styled(Arrow)`
  right: -40px;
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 30px solid ${COLORS.black};
  }
  &:before{
    right: 0;
  }
  &:after{
    right: 2px;
    border-left-color: ${COLORS.white}
  }
`