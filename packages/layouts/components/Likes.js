import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import React from 'react'

const Likes = ({ count, onLikeClick }) => (
  <span className="vertAlign">
    <ThumbUpIcon onClick={onLikeClick} className="likeStyle" />({count})
  </span>
)

export default Likes
