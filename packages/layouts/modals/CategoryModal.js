import {
  categoryActions,
  categorySelectors,
  modalActions,
  modalSelectors,
} from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import get from 'lodash/get'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { changeNodeAtPath } from 'react-sortable-tree'
import { Theme as MuiTheme } from 'rjsf-material-ui'

const getNodeKey = ({ treeIndex }) => treeIndex

const CategoryModal = () => {
  const dispatch = useDispatch()
  const categories = useSelector(categorySelectors.categorySelector)
  const { data } = categories
  const modals = useSelector(modalSelectors.modalSelector) || []
  const { node, path } = modals[modals.length - 1]
  const Form = withTheme(MuiTheme)
  const schema = {
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        title: 'Project Title',
        default: get(node.title, ''),
      },
    },
  }

  const uiSchema = {}

  const onSubmit = ({ formData }) => {
    const newTree = changeNodeAtPath({
      treeData: data,
      path,
      getNodeKey,
      newNode: { ...node, title: formData.title },
    })
    dispatch(categoryActions.setCategories({ ...categories, data: newTree }))
    dispatch(modalActions.removeModal())
  }
  const onChange = () => undefined

  return (
    <Container maxWidth="sm">
      <div>
        <Form
          schema={schema}
          onSubmit={onSubmit}
          onChange={onChange}
          uiSchema={uiSchema}
        >
          <div className="padd_top_bott">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default CategoryModal
