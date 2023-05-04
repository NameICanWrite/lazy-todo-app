import styled from 'styled-components'
import {Button} from '../common/components/button/button'
import { BREAKPOINTS, COLORS, DEVICE, SPACES } from "../theme"
import Input from "./input/input"

export const Container = styled.div`
  padding: ${SPACES.sm};
  @media ${DEVICE.tablet} {
    padding: ${SPACES.lg} ${SPACES.md};
  }
  @media ${DEVICE.mobile} {
    padding: ${SPACES.lg} ${SPACES.xs};
  }
`

export const SliderContainer = styled('div')`
  position: relative
`

export const CreateButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: transparent;
  margin-bottom: ${SPACES.md};
  display: block;
  cursor: pointer;
`

export const TodosTable = styled('div')`
  border: 2px solid ${COLORS.black};
  margin-bottom: ${SPACES.sm};
`

export const Arrow = styled('div')`
  cursor: pointer;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const PrevArrow = styled(Arrow).attrs(() => ({className: 'swiper-button-prev'}))`
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

export const NextArrow = styled(Arrow).attrs(() => ({className: 'swiper-button-next'}))`
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

export const SearchInput = styled(Input)`
 width: 300px;
 margin-right: 0;
 margin-left: auto;
 margin-top: ${SPACES.sm};
 display: block;
`

export const FiltersContainer = styled('div')`
  display: flex;
  width: ${BREAKPOINTS.mobile};
  justify-content: space-around;
  flex-wrap: wrap;
`

export const FilterButton = styled('button')`
  width: 100px;
  height: 30px;
  background-color: ${({isSelected}: {isSelected: boolean}) => 
    isSelected ? COLORS.veryLight : 'transparent'
  };
  /* margin: ${SPACES.xxs}; */
  margin-bottom: ${SPACES.sm};
  display: block
  cursor: pointer;
`
