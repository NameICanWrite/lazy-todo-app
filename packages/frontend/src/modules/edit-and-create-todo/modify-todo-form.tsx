import { FormikConfig, useFormik, FormikProps } from "formik"
import todoService from "../../service/todos"
import { ITodoCreate } from "../common/types/todos.type"
import { Switch, useHistory } from "react-router-dom"
import { APP_KEYS } from "../common/consts"
import { ITodo } from "../common/types/todos.type"
import { useEffect } from "react"
import styled from "styled-components"
import Input from "../common/components/input/input"
import { Button, Form, IsPrivate } from "./modify-todo-form.styled"

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



export default ModifyTodoForm


