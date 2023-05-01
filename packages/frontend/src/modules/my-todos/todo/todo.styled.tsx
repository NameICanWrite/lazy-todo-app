import styled from "styled-components"
import SwitchButton from "../switch-button/switch-button"
import { COLORS, DEVICE, SPACES } from "../../theme"

export const Name = styled('h3')`
  width: 20%;
  padding-left: 10px;
  border-right: 2px solid ${COLORS.black};
  display: flex;
  align-items: center;
  ${DEVICE.tablet} {
    border: none;
    width: 100%;
    margin-bottom: ${SPACES.xs}
  }
`
export const Description = styled('div')`  
  border-color: ${COLORS.black};
  border-right: 2px solid;
  overflow-wrap: break-all;
  word-wrap: break-all;
  overflow-wrap: anywhere;
  word-wrap: break-all;
  width: 80%;
  padding: ${SPACES.xs};
  display: flex;
  align-items: center;
  flex-grow: 1;
  ${DEVICE.tablet} {
    border: none;
    width: 100%;
    min-height: 100px;
    align-items: start;
    margin-bottom: ${SPACES.xs};
  }
`
export const DescriptionText = styled('div')`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Container = styled('div') <{ index: number }>`
  display: flex;
  box-sizing: border-box;
  background-color: ${props => props.index % 2 === 0 ? COLORS.veryLight : COLORS.white};
  ${DEVICE.tablet} {
    flex-direction: column;
    background-color: transparent;
  }
  ${DEVICE.mobile} {
    margin-bottom: ${SPACES.sm}
  }
`

export const Button = styled('button')`
  background-color: ${COLORS.white};
  cursor: pointer;
`
export const ViewButton = styled(Button)`
  margin-right: ${SPACES.xs};
  margin-left: ${SPACES.sm};
  ${DEVICE.desktop} {
    margin-right: ${SPACES.xs};
    margin-left: ${SPACES.sm};
  };
`
export const DeleteButton = styled(Button)`
  margin-right: ${SPACES.sm};
  ${DEVICE.desktop} {
    margin-right: ${SPACES.xs};
  }
`
export const CompleteButton = styled(SwitchButton)`
  margin-right: ${SPACES.md};
  ${DEVICE.desktop} {
    margin-right: ${SPACES.sm};
  }
`
export const Actions = styled('div')`
  padding: ${SPACES.xxs} 0;
  border-color: ${COLORS.black};
  display: flex;
  align-items: center;
`