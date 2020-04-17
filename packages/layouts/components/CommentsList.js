import React from 'react'

const CommentsList = ({ comments }) => {
  console.log('########## CommentsList comments', comments)
  const renderComments = () => {
    return comments.map((el) => {
      const { _id, name, comment } = el
      return (
        <div key={_id} className="commentBlock">
          <div>{name}</div>
          <div>{comment}</div>
        </div>
      )
    })
  }
  return <div className="commentWrapper">{renderComments()}</div>
}

export default CommentsList
