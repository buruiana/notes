import {
  categoryActions,
  categorySelectors,
  modalActions,
} from '@just4dev/services'
import Button from '@material-ui/core/Button'
import { DeleteRounded } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

const externalNodeType = 'yourNodeType'
const shouldCopyOnOutsideDrop = true
const getNodeKey = ({ treeIndex }) => treeIndex

export const defaultTree = [
  {
    title: '',
    subtitle: '',
  },
]

const Categories = () => {
  const dispatch = useDispatch()
  const categories = useSelector(categorySelectors.categorySelector) || []
  const { data = [] } = categories

  const remove = (path) => {
    const newTree = removeNodeAtPath({
      treeData: categories,
      path,
      getNodeKey,
    })
    dispatch(categoryActions.setCategories(newTree))
  }

  const onChange = (treeData) =>
    dispatch(categoryActions.setCategories({ ...categories, data: treeData }))

  const log = (type) => console.log.bind(console, type)

  const getButtons = ({ node, path }) => {
    return [
      <DeleteRounded
        color="primary"
        className="generic_link"
        onClick={() => remove(path)}
      />,
      <EditIcon
        color="primary"
        className="generic_link"
        onClick={() =>
          dispatch(modalActions.addModal({ type: 'category', node, path }))
        }
      />,
    ]
  }

  const onSave = () =>
    dispatch(
      categoryActions.handleCategories({
        operation: categories._id ? 'update' : 'create',
        modelType: 'category',
        query: {},
        info: { data },
        query: { _id: categories._id },
      }),
    )

  return (
    <div className="row">
      <div className="icon_wrapper">
        <Button size="small" onClick={onSave}>
          Save
        </Button>
      </div>
      <div
        className="column50"
        style={{
          height: window.innerHeight - 100,
          float: 'left',
          minHeight: window.innerHeight - 100,
        }}
      >
        <SortableTree
          treeData={defaultTree}
          onChange={() => console.log('changed')}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
        />
      </div>

      <div className="column50">
        <SortableTree
          treeData={data}
          onChange={onChange}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({ node, path }) => ({
            buttons: getButtons({ node, path }),
          })}
        />
      </div>
    </div>
  )
}

export default Categories
