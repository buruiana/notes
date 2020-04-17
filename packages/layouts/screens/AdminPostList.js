import { postActions, postSelectors } from '@just4dev/services'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { DeleteRounded } from '@material-ui/icons'
import { navigate } from '@reach/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postSelectors.postSelector) || []

  useEffect(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {},
      }),
    )
    return () => {
      dispatch(postActions.resetPosts())
    }
  }, [])

  const renderPosts = () => {
    return posts.map((post) => {
      const {
        _id: postId,
        title,
        postUrl,
        shortDescription,
        datetime,
        category,
      } = post

      const onLinkClick = () => navigate(`/postform/${postUrl}`)
      const onDelete = () => undefined

      return (
        <TableRow key={postId}>
          <TableCell component="th" scope="row">
            <Link onClick={onLinkClick}>{title}</Link>
          </TableCell>
          <TableCell>{category}</TableCell>
          <TableCell>{shortDescription}</TableCell>
          <TableCell>{new Date(datetime).toDateString()}</TableCell>
          <TableCell align="right">
            <DeleteRounded
              onClick={onDelete}
              color="primary"
              className="generic_link"
            />
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>{renderPosts()}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default PostList
