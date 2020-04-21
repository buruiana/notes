import { categoryActions, categorySelectors } from '@just4dev/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'

const Categories = () => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)
  const categories = useSelector(categorySelectors.categorySelector) || []

  const schema = {
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'object',
          required: ['categoryTitle'],
          properties: {
            categoryTitle: { type: 'string' },
            categoryActive: { type: 'boolean' },
            categoryMetaKeywords: { type: 'string' },
            categoryMetaTitle: { type: 'string', maxLength: 60 },
            categoryMetaDescription: { type: 'string', maxLength: 160 },
            categoryMetaRobots: { type: 'string' },
            categoryMetaViewport: {
              type: 'string',
              default: 'width=device-width, initial-scale=1.0',
            },
            categoryMetaCharset: { type: 'string', default: 'UTF-8' },
            subcategories: {
              type: 'array',
              uniqueItems: true,
              items: {
                type: 'object',
                required: ['subcategoryTitle'],
                properties: {
                  subcategoryTitle: { type: 'string' },
                  subcategoryActive: { type: 'boolean' },
                  subcategoryMetaKeywords: { type: 'string' },
                  subcategoryMetaTitle: { type: 'string', maxLength: 60 },
                  subcategoryMetaDescription: {
                    type: 'string',
                    maxLength: 160,
                  },
                  subcategoryMetaRobots: { type: 'string' },
                  categoryMetaViewport: {
                    type: 'string',
                    default: 'width=device-width, initial-scale=1.0',
                  },
                  subcategoryMetaCharset: { type: 'string', default: 'UTF-8' },
                },
              },
            },
          },
        },
      },
    },
  }

  const uiSchema = {
    categories: {
      items: {
        categoryMetaKeywords: {
          'ui:options': { label: true, rows: 5 },
          'ui:widget': 'textarea',
        },
        categoryMetaDescription: {
          'ui:options': { label: true, rows: 5 },
          'ui:widget': 'textarea',
        },
        subcategories: {
          items: {
            subcategoryMetaKeywords: {
              'ui:options': { label: true, rows: 5 },
              'ui:widget': 'textarea',
            },
            subcategoryMetaDescription: {
              'ui:options': { label: true, rows: 5 },
              'ui:widget': 'textarea',
            },
          },
        },
      },
    },
  }

  const onSubmit = ({ formData }) => {
    dispatch(
      categoryActions.handleCategories({
        operation: categories._id ? 'update' : 'create',
        modelType: 'category',
        query: {},
        info: formData,
        query: { _id: categories._id },
      }),
    )
  }

  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        formData={categories}
      >
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Categories
