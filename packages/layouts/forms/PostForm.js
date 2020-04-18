import {
  keywordActions,
  keywordSelectors,
  loginSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { navigate } from '@reach/router'
import { EditorState } from 'draft-js'
import React, { useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import '../react-draft-wysiwyg.css'

const PostForm = ({ id }) => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)
  const authenticated = useSelector(loginSelectors.loginSelector)
  const keywords = useSelector(keywordSelectors.keywordSelector) || []
  const record = useSelector(postSelectors.postByPostUrlSelector)(id) || {}

  useEffect(() => {
    if (authenticated) navigate(`/editor`)
  }, [authenticated])

  useEffect(() => {
    if (!record._id) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: { postUrl: id },
        }),
      )
    }
  }, [record._id])

  useEffect(() => {
    dispatch(
      keywordActions.handleKeywords({
        operation: 'read',
        modelType: 'keyword',
        query: {},
      }),
    )
    return () => {
      dispatch(keywordActions.resetKeywords)
    }
  }, [])

  const post = record._id
    ? {
        ...record,
        priority: parseInt(record.priority),
        category: record.category.toString(),
      }
    : {}

  const schema = {
    type: 'object',
    required: ['title', 'content', 'category'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      imageName: { type: 'string' },
      datetime: {
        type: 'string',
        format: 'date-time',
        default: new Date().toISOString(),
      },
      shortDescription: { type: 'string' },
      longDescription: { type: 'string' },
      category: { type: 'string' },
      keywords: {
        type: 'array',
        items: {
          type: 'object',
          properties: { name: { type: 'string' } },
        },
      },
      priority: { type: 'number' },
      postUrl: { type: 'string' },
    },
  }

  const uiSchema = {
    title: {},
    content: {
      'ui:options': { label: true, rows: 12 },
      'ui:placeholder': '',
      'ui:widget': 'textarea',
    },
    date: {
      'ui:options': { inputType: 'date', label: true },
      'ui:placeholder': '',
    },
    shortDescription: {},
    longDescription: {
      'ui:options': { label: true, rows: 10 },
      'ui:placeholder': '',
      'ui:widget': 'textarea',
    },
    category: {},
    keywords: { items: { name: {} } },
  }

  const onSubmit = ({ formData }) => {
    if (!record._id) {
      formData.keywords.map((k) => {
        const existing = keywords.find((e) => e.name === k.name)

        if (!existing) {
          dispatch(
            keywordActions.handleKeywords({
              operation: 'create',
              modelType: 'keyword',
              info: { name: k.name.toLowerCase().trim(), count: 1 },
            }),
          )
        } else {
          dispatch(
            keywordActions.handleKeywords({
              operation: 'update',
              modelType: 'keyword',
              info: {
                count: parseInt(existing.count) + 1,
              },
              query: { _id: existing._id },
            }),
          )
        }
      })
    }

    dispatch(
      postActions.handlePosts({
        operation: formData._id ? 'update' : 'create',
        modelType: 'post',
        info: {
          ...formData,
          postUrl: formData.postUrl.split(' ').join('-').toLowerCase().trim(),
        },
        query: { _id: formData._id },
      }),
    )
    navigate('/adminpostlist')
  }

  const onEditorStateChange = () => undefined
  const showKeywords = () =>
    keywords.map((keyword) => keyword.name.concat(', '))
  const editorState = EditorState.createEmpty()

  return (
    <Container maxWidth="md">
      <Editor
        initialEditorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
      <div>{showKeywords()}</div>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        formData={post}
      >
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default PostForm
