import {
  categorySelectors,
  commentActions,
  keywordActions,
  keywordSelectors,
  likeActions,
  postActions,
  postSelectors,
} from '@just4dev/services'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { DeleteRounded } from '@material-ui/icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import { navigate } from '@reach/router'
import isEmpty from 'lodash/isEmpty'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postSelectors.postSelector) || []
  const { categories = [] } = useSelector(categorySelectors.categorySelector)
  const allKeywords = useSelector(keywordSelectors.keywordSelector) || []

  useEffect(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        query: {},
      }),
    )
    dispatch(
      likeActions.handleLikes({
        operation: 'read',
        modelType: 'like',
        query: {},
      }),
    )
    dispatch(
      commentActions.handleComments({
        operation: 'read',
        modelType: 'comment',
        query: {},
      }),
    )
    dispatch(
      keywordActions.handleKeywords({
        operation: 'read',
        modelType: 'keyword',
        query: {},
      }),
    )
    return () => {
      dispatch(postActions.resetPosts())
    }
  }, [])

  const renderPosts = () => {
    if (posts.length === 0)
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            No Posts
          </TableCell>
        </TableRow>
      )
    return posts.map((post) => {
      const {
        _id: postId,
        title,
        postUrl,
        shortDescription,
        datetime,
        category,
        subcategory,
      } = post

      const getCategoryName = (cat) => {
        if (isEmpty(categories)) return { subcategories: [] }
        return categories.find((e) => e.categoryId === cat).categoryTitle
      }

      const onTitleClick = () =>
        navigate(`/${category}/${subcategory}/${postUrl}`)
      const onEdit = () => navigate(`/postform/${postUrl}`)

      const onDelete = async (postId) => {
        const post = posts.find((post) => post._id === postId)
        const { keywords } = post
        keywords.map((keyword) => {
          const data = allKeywords.find((e) => e.name === keyword.name)

          if (data.count >= 2) {
            dispatch(
              keywordActions.handleKeywords({
                operation: 'update',
                modelType: 'keyword',
                query: { _id: data._id },
                info: { count: parseInt(data.count) - 1 },
              }),
            )
          } else {
            dispatch(
              keywordActions.handleKeywords({
                operation: 'deleteOne',
                modelType: 'keyword',
                query: { _id: data._id },
              }),
            )
          }
        })
        await Promise.all([
          dispatch(
            likeActions.handleLikes({
              operation: 'deleteOne',
              modelType: 'like',
              query: { postId },
            }),
          ),

          dispatch(
            commentActions.handleComments({
              operation: 'deleteMany',
              modelType: 'comment',
              query: { postId },
            }),
          ),

          dispatch(
            postActions.handlePosts({
              operation: 'deleteOne',
              modelType: 'post',
              query: { _id: postId },
            }),
          ),
        ])
      }

      return (
        <TableRow key={postId}>
          <TableCell component="th" scope="row">
            <Link onClick={onTitleClick} className="generic_link">
              {title}
            </Link>
          </TableCell>
          <TableCell>{getCategoryName(category)}</TableCell>
          <TableCell>{shortDescription}</TableCell>
          <TableCell>{new Date(datetime).toDateString()}</TableCell>
          <TableCell align="right">
            <DeleteRounded
              onClick={() => onDelete(postId)}
              color="primary"
              className="generic_link"
            />
            <EditIcon
              onClick={() => onEdit(postId)}
              color="primary"
              className="generic_link"
            />
          </TableCell>
        </TableRow>
      )
    })
  }
  const addNew = () => navigate('/postform')

  return (
    <>
      <div className="icon_wrapper">
        <AddCircleOutlineIcon
          onClick={addNew}
          color="primary"
          fontSize="large"
          className="generic_link"
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>{renderPosts()}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Posts
