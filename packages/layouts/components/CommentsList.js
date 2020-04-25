import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { DeleteRounded } from '@material-ui/icons'
import React from 'react'

const CommentsList = ({ comments, onDeleteComment }) => {
  const renderComments = () => {
    return comments.map((el) => {
      const { _id, name, comment } = el

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
