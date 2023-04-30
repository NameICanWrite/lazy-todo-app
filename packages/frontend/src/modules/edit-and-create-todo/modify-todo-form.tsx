import { FormikConfig, useFormik, FormikProps } from "formik"
import todoService from "../../service/todos"
import { ITodoCreate } from "../common/types/todos.type"
import { Switch, useHistory } from "react-router-dom"
import { APP_KEYS } from "../common/consts"
import { ITodo } from "../common/types/todos.type"
import { useEffect } from "react"
import styled from "styled-components"
import Checkbox from "../my-todos/switch-button/switch-button"
import Input from "../my-todos/input/input"

const ModifyTodoForm = ({formik}: {formik: FormikProps<ITodo> | FormikProps<ITodoCreate>}) => {
  const history = useHistory()
  
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input 
        name="name"
        label="Name"
        placeholder="Enter name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <Input
        name="description"
        type="textarea"
        label="Description"
        placeholder="Enter description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <IsPrivate
        name='isPrivate'
        label={'Is private?'}
        on={formik.values.isPrivate}
        onSwitch={formik.handleChange}
      />
      <Button>
        Submit
      </Button>
    </Form>
  )
}

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: fit-content;
  margin: 0 auto;
  @media(max-width: 768px) {
    width: 400px; 
  }
  @media(max-width: 576px) {
    width: 100%;
    padding: 5px
  }
`
export const Button = styled('button')`
  display: block;
  width: 100%;
  height: 40px;
`
export const IsPrivate = styled(Checkbox)`
  margin-bottom: 10px;
`

export default ModifyTodoForm


