import { commentActions } from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)

  const schema = {
    type: 'object',
    required: ['name', 'comment', 'postId', 'datetime'],
    properties: {
      notRobot: { type: 'boolean' },
      postId: { type: 'string', default: postId },
      name: { type: 'string' },
      comment: { type: 'string' },
      datetime: {
        type: 'string',
        format: 'date-time',
        default: new Date().toISOString(),
      },
    },
  }

  const uiSchema = {
    comment: {
      'ui:options': { label: true, rows: 10 },
      'ui:placeholder': '',
      'ui:widget': 'textarea',
    },
    postId: {
      'ui:options': { label: false },
      'ui:widget': 'hidden',
    },
    notRobot: {
      'ui:options': { label: false },
      'ui:widget': 'hidden',
    },
    datetime: {
      'ui:options': { inputType: 'date', label: true },
      'ui:placeholder': '',
      'ui:widget': 'hidden',
    },
  }

  const onCommentSubmit = ({ formData }) => {
    if (!formData.notRobot) {
      dispatch(
        commentActions.handleComments({
          operation: 'create',
          modelType: 'comment',
          info: formData,
        }),
      )
    }
  }

  return (
    <Container maxWidth="md">
      <Form schema={schema} onSubmit={onCommentSubmit} uiSchema={uiSchema}>
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CommentForm
