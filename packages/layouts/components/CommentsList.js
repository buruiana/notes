import { commentActions } from '@just4dev/services'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteRounded } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const CommentsList = ({ comments }) => {
  const dispatch = useDispatch()
  const renderComments = () => {
    return comments.map((el) => {
      const { _id, name, comment } = el
      const onDeleteComment = (_id) =>
        dispatch(
          commentActions.handleComments({
            operation: 'deleteOne',
            modelType: 'comment',
            info: { query: { _id } },
          }),
        )
      return (
        <List key={_id}>
          <ListItem>
            <ListItemText primary={name} secondary={comment} />
            <DeleteRounded
              onClick={() => onDeleteComment(_id)}
              color="primary"
              className="generic_link"
            />
          </ListItem>
          <Divider component="li" />
        </List>
      )
    })
  }
  return <div className="commentWrapper">{renderComments()}</div>
}

export default CommentsList
