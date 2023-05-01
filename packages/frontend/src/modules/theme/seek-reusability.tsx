// import styled from "styled-components"


// //modify-todo-form
// export const Form = styled('form')`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 500px;
//   height: fit-content;
//   margin: 0 auto;
//   @media(max-width: 768px) {
//     width: 400px; 
//   }
//   @media(max-width: 576px) {
//     width: 100%;
//     padding: ${SPACES.xxs}
//   }
// `
// export const Button = styled('button')`
//   display: block;
//   width: 100%;
//   height: 40px;
// `
// export const IsPrivate = styled(Checkbox)`
//   margin-bottom: 10px;
// `

// //input
// export const Container = styled('div')`
//   width: 100%;
//   margin-bottom: 20px
// `

// export const InputField = styled.input.attrs((props) => ({
//   name: props.name,
//   value: props.value,
//   onChange: props.onChange,
//   type: props.type,
// }))`
//   width: 100%;
//   border: 1px solid rgb(204, 204, 204);
// `

// export const TextAreaField = styled.textarea.attrs((props) => ({
//   name: props.name,
//   value: props.value,
//   onChange: props.onChange,
// }))`
//   width: 100%;
//   resize: none;
//   height: 100px;
// `

// export const Label = styled('label').attrs((props) => ({
//   htmlFor: props.htmlFor,
// }))<{label: string | undefined}> `;
//   display: ${({label}) => label? 'block' : 'none'};
// `

// export const Wrapper = styled('div')`
//   position: relative;
// `

// export const Placeholder = styled('div')<{value: string | number, type?: string}>`
//   position: absolute;
//   top: ${({type}) => type === 'textarea' ? '15px' : '50%'};
//   left: 3px;
//   transform: ${({type}) => type === '' ? 'translateY(0)' : 'translateY(-50%)'};
//   display: ${({value, placeholder}) => !value || !placeholder ? 'block' : 'none'};
//   color: ${COLORS.lightGrey};
//   pointer-events: none
// `

// export const ErrorComponent = styled.div<{error: string | null | undefined}>`
//   color: ${COLORS.red};
//   display: ${({error}) => error? 'block' : 'none'};
// `

// //switch-button
// export const Container = styled('div')``

// export const Label = styled('label').attrs((props) => ({
//   htmlFor: props.htmlFor,
// }))<{label: string | undefined}> `;
//   display: ${({label}) => label? 'block' : 'none'};
//   margin-bottom: 5px;
// `

// export const Wrapper = styled('div')`
//   width: 40px;
//   padding: 0;
//   height: 20px;
//   border-radius: 50px;
//   border: 2px solid black;
//   position: relative;
// `
// export const CheckField = styled.input.attrs(props => ({
//   name: props.name,
//   type: 'checkbox'
// }))`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   margin: 0;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%); 
//   opacity: 0;
// `

// export const Circle = styled('div') <{ $on: boolean }>`
//   width: 20px;
//   height: 20px;
//   border-radius: 50px;
//   border: 2px solid black;
//   background-color: ${COLORS.white};
//   transition: 0.4s all;
//   position: absolute;
//   top: 50%;
//   left: ${({ $on }) => $on ? '100%' : '0'};
//   transition: 0.4s all;
//   transform: translateX(${({ $on }) => ($on ? '-100%' : '0')}) translateY(-50%)
// `


// //to-do
// export const Name = styled('h3')`
//   width: 20%;
//   padding-left: 10px;
//   border-right: 2px solid black;
//   display: flex;
//   align-items: center;
//   @media (max-width: 768px){
//     border: none;
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `
// export const Description = styled('div')`  
//   border-color: ${COLORS.black};
//   border-right: 2px solid;
//   overflow-wrap: break-all;
//   word-wrap: break-all;
//   overflow-wrap: anywhere;
//   word-wrap: break-all;
//   width: 80%;
//   padding: ${SPACES.xs};
//   display: flex;
//   align-items: center;
//   flex-grow: 1;
//   @media (max-width: 768px){
//     border: none;
//     width: 100%;
//     min-height: 100px;
//     align-items: start;
//     margin-bottom: 10px;
//   }
// `
// export const DescriptionText = styled('div')`
//   display: -webkit-box;
//   -webkit-line-clamp: 5;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// `

// export const Container = styled('div') <{ index: number }>`
//   display: flex;
//   box-sizing: border-box;
//   background-color: ${props => props.index % 2 === 0 ? '#ececec' : 'white'};
//   @media (max-width: 768px){
//     flex-direction: column;
//     background-color: transparent;
//   }
//   @media(max-width: 425px) {
//     margin-bottom: 30px
//   }
// `

// export const Button = styled('button')`
//   background-color: ${COLORS.white};
//   cursor: pointer;
// `
// export const ViewButton = styled(Button)`
//   margin-right: 10px;
//   margin-left: 20px;
//   @media (max-width: 991px){
//     margin-right: 10px;
//     margin-left: 15px;
//   };
// `
// export const DeleteButton = styled(Button)`
//   margin-right: 20px;
//   @media (max-width: 991px){
//     margin-right: 10px;
//   }
// `
// export const CompleteButton = styled(SwitchButton)`
//   margin-right: 50px;
//   @media (max-width: 991px){
//     margin-right: 20px;
//   }
// `
// export const Actions = styled('div')`
//   padding: ${SPACES.xxs} 0;
//   border-color: ${COLORS.black};
//   display: flex;
//   align-items: center;
// `

// //to-dos page
// export const Container = styled.div`
//   padding: ${SPACES.sm};
//   @media(max-width: 768px) {
//     padding: ${SPACES.lg} 50px;
//   }
//   @media(max-width: 425px) {
//     padding: ${SPACES.lg} 10px;
//   }
// `
// export const CreateButton = styled.button`
//   width: 120px;
//   height: 50px;
//   background-color: transparent;
//   margin-bottom: 40px;
//   cursor: pointer
// `

// export const TodosTable = styled('div')`
//   border: 2px solid black;
// `

// //pagination
// export const Container = styled('div')`
//   display: flex;
//   border-radius: 2px;
//   z-index: 10;
//   bottom: 0;
//   position: sticky;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: ${COLORS.white};
//   height: 40px
// `

// export const ElemStyles = css`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px solid #d2d2d2;
//   margin: 0 4px;
//   font-size: ${FONT_SIZES.small};
//   height: 25px;
//   width: 25px;
// `

// export const Elem = styled('div')`
//   ${ElemStyles}
// `

// export const Button = styled('button')`
//   ${ElemStyles}
// `

// export const MoveButton = styled(Button)`
//   color: ${COLORS.lightGrey};
//   font-size: 14px;
// `

// export type NumberProps = {
//   number: number,
//   currentPage: number,
//   onPage: (event: MouseEvent<HTMLElement>) => void
// }

// export const Number: FC<NumberProps> = (props) => {
//   const { number, currentPage, onPage } = props

//   return (
//     <>
//       {currentPage !== number ? (
//         <Button
//           onClick={onPage}
//           name={`${number}`}
//         >
//           {number}
//         </Button>
//       ) : (
//         <CurrentPage>
//           {currentPage}
//         </CurrentPage>
//       )}
//     </>
//   )
// }

// export const CurrentPage = styled(Button)`
//   background-color: ${COLORS.black};
//   color: ${COLORS.white};
//   border-color: ${COLORS.black};
// `

// export const Ellipsis: FC = () => {
  
//   return (
//     <EllipsisContainer>
//       <EllipsisElem />
//       <EllipsisElem />
//       <EllipsisElem />
//     </EllipsisContainer>
//   )
// }

// export const EllipsisContainer = styled(Elem)`
//   border: none;
//   width: auto;
// `

// export const EllipsisElem = styled('div')`
//   background-color: ${COLORS.black};
//   margin: 8px 2px 0 2px;
//   width: 1.44px;
//   height: 1.44px;
//   border-radius: 50px;
// `

// //slider
// export const Container = styled('div')`
//   width: 100%;
//   position: relative;
//   border: 2px solid black;
// `

// export const Content = styled('div')`
//   overflow-x: hidden;
//   overflow-y: visible;
//   -ms-overflow-style: none;
//   scrollbar-width: none;
//   &::-webkit-scrollbar{
//     display: none
//   }
// `

// export const Track = styled('div')`
//   display: flex;
//   align-items: start;
//   height: 100%;
//   width: 100%;
//   transition: 0.5s all
// `

// export const Elem = styled('div')`
//   flex-shrink: 0;
//   width: 100%
// `

// export const Arrow = styled('div')`
//   cursor: pointer;
//   background-color: transparent;
//   border: none;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
// `

// export const BackArrow = styled(Arrow)`
//   left: -40px;
//   z-index: 10;
//   &:before, &:after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     width: 0;
//     height: 0;
//     border-top: 30px solid transparent;
//     border-bottom: 30px solid transparent;
//     border-right: 30px solid black;
//   }
//   &:before{
//     left: 0;
//   }
//   &:after{
//     left: 2px;
//     border-right-color: ${COLORS.white}
//   }
// `

// export const ForwardArrow = styled(Arrow)`
//   right: -40px;
//   &:before, &:after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     width: 0;
//     height: 0;
//     border-top: 30px solid transparent;
//     border-bottom: 30px solid transparent;
//     border-left: 30px solid black;
//   }
//   &:before{
//     right: 0;
//   }
//   &:after{
//     right: 2px;
//     border-left-color: ${COLORS.white}
//   }
// `

// //slider
// export const Header = styled('h1')`
// `

// export const Description = styled('p')`
// `

// export const Wrapper = styled('div')`
//   margin: 10px
// `