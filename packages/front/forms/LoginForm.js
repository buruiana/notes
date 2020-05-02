import { loginActions } from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'

const LoginForm = ({ navigate }) => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)

  const schema = {
    type: 'object',
    properties: {
      username: { title: 'Email', type: 'string' },
      password: { title: 'Password', type: 'string' },
    },
  }
  const uiSchema = {
    title: {
      'ui:placeholder': 'email',
    },
    password: {
      'ui:widget': 'password',
      'ui:placeholder': 'password',
    },
  }

  const onSubmit = ({ formData }) => {
    dispatch(loginActions.signin(formData))
  }

  return (
    <Container maxWidth="md">
      <Form schema={schema} onSubmit={onSubmit} uiSchema={uiSchema}>
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default LoginForm
