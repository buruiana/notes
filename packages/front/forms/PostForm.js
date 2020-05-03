import {
  categorySelectors,
  keywordActions,
  keywordSelectors,
  loginSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { navigate } from '@reach/router'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import get from 'lodash/get'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'

const PostForm = ({ id }) => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)

  const authenticated = useSelector(loginSelectors.loginSelector)
  const keywords = useSelector(keywordSelectors.keywordSelector) || []
  const record = useSelector(postSelectors.postByPostUrlSelector)(id) || {}
  const [formData, setFormData] = useState(record)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { content, priority, category } = record

  const { categories = [] } = useSelector(categorySelectors.categorySelector)
  const catList = categories.map((cat) => cat.categoryId)
  const catListNames = categories.map((cat) => cat.categoryTitle)

  const editor = useRef(null)
  const focusEditor = () => {
    if (get(editor, 'current.focus', false)) {
      editor.current.focus()
    }
  }

  useEffect(() => focusEditor(), [])

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
    if (content) {
      const contentState = convertFromRaw(JSON.parse(content))
      setEditorState(EditorState.createWithContent(contentState))

      setFormData({
        ...record,
        priority: parseInt(priority),
        category: category.toString(),
        content: stateToHTML(contentState),
      })
    }
  }, [content, priority, category])

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

  const getSubcategory = (catId) => {
    if (catId) {
      const selectedCat = categories.find(
        (category) => category.categoryId.toLowerCase() === catId.toLowerCase(),
      ) || { subcategories: [] }

      const enumIds = selectedCat.subcategories.map((e) => e.subcategoryId)
      const enumTitles = selectedCat.subcategories.map(
        (e) => e.subcategoryTitle,
      )
      return {
        enumIds,
        enumTitles,
      }
    }
  }

  const onFormChange = ({ formData }) => {
    const contentState = editorState.getCurrentContent()

    setFormData({
      ...formData,
      content: stateToHTML(contentState),
    })
  }

  const DraftWidget = () => {
    return (
      <Editor
        ref={editor}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        editorState={editorState}
        onEditorStateChange={(e) => setEditorState(e)}
      />
    )
  }

  const widgets = {
    draftWidget: DraftWidget,
  }

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
      category: {
        type: 'string',
        enum: catList,
        enumNames: catListNames,
      },
      subcategory: {
        type: 'string',
        enum: [],
        enumNames: [],
      },
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
    'ui:widget': 'draftWidget',
    content: {
      'ui:options': { label: true, rows: 12 },
      'ui:placeholder': '',
      'ui:widget': 'draftWidget',
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

  if (formData.category) {
    schema.properties.subcategory = {
      ...schema.properties.subcategory,
      enum: getSubcategory(formData.category).enumIds,
      enumNames: getSubcategory(formData.category).enumTitles,
    }
  }

  const onSubmit = ({ formData }) => {
    const contentState = editorState.getCurrentContent()
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
          postUrl: formData.postUrl
            .replace(/[^\w\s]/gi, '')
            .split(' ')
            .join('-')
            .toLowerCase()
            .trim(),
          content: JSON.stringify(convertToRaw(contentState)),
        },
        query: { _id: formData._id },
      }),
    )
    navigate('/aPosts')
  }

  const showKeywords = () =>
    keywords.map((keyword) => keyword.name.concat(', '))

  return (
    <Container maxWidth="md">
      <div>{showKeywords()}</div>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        formData={formData}
        widgets={widgets}
        onChange={onFormChange}
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
