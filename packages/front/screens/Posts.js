import {
  commentActions,
  keywordActions,
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
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import { getCategoryName } from '../utils/common'
import { useCategories } from './../hooks/useCategories'
import { useKeywords } from './../hooks/useKeywords'

const addNew = () => navigate('/postform')

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postSelectors.postSelector) || []
  const { categories } = useCategories({})
  const { keywords: allKeywords } = useKeywords()

  useAuth()

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
    return posts.map(
      ({
        _id: postId,
        title,
        postUrl,
        shortDescription,
        datetime,
        category,
        subcategory,
      }) => {
        const onTitleClick = useCallback(() => {
          navigate(`/${category}/${subcategory}/${postUrl}`)
        }, [category, subcategory, postUrl])

        const onEdit = useCallback(() => {
          navigate(`/postform/${postUrl}`)
        }, [postUrl])

        const onDelete = async (postId) => {
          const post = posts.find((post) => post._id === postId)
          const { keywords } = post
          keywords.map((keyword) => {
            const data = allKeywords.find((e) => e.name === keyword.name)
            if (data) {
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

        const { categoryTitle, subcategoryTitle } = getCategoryName({
          category,
          subcategory,
          categories,
        })

        return (
          <TableRow key={postId}>
            <TableCell component="th" scope="row">
              <Link onClick={onTitleClick} className="generic_link">
                {title}
              </Link>
              <div>
                {categoryTitle} / {subcategoryTitle}
              </div>
              <div>{new Date(datetime).toDateString()}</div>
              <div>{shortDescription}</div>
            </TableCell>
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
      },
    )
  }

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
