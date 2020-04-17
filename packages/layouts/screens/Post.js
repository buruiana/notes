import {
  commentActions,
  commentSelectors,
  likeActions,
  likeSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import CommentsList from '../components/CommentsList'
import Likes from '../components/Likes'
import CommentForm from '../forms/CommentForm'

const Post = ({ id }) => {
  const dispatch = useDispatch()

  const post = useSelector(postSelectors.postByPostUrlSelector)(id) || {}
  const likes = useSelector(likeSelectors.likeSelector) || { postId, count: 0 }
  const comments = useSelector(commentSelectors.commentSelector) || []

  const { title, content, datetime, _id: postId } = post

  useEffect(() => {
    if (!post._id) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          info: { query: { postUrl: id } },
        }),
      )
    }
  }, [post._id])

  useEffect(() => {
    if (postId) {
      dispatch(
        likeActions.handleLikes({
          operation: 'read',
          modelType: 'like',
          info: { postId },
        }),
      )
      dispatch(
        commentActions.handleComments({
          operation: 'read',
          modelType: 'comment',
          info: { postId },
        }),
      )
    }
  }, [postId])

  const onLikeClick = () =>
    dispatch(
      likeActions.createLike({
        postId,
        count: parseInt(likes.count + 1),
        _id: likes._id,
      }),
    )

  const renderPost = () => {
    return (
      <div>
        <h2>{title}</h2>
        <Breadcrumb />
        <div>{content}</div>
      </div>
    )
  }

  return (
    <div>
      {renderPost()}
      <div className="date-more">
        <span>{new Date(datetime).toDateString()}</span>
        <span>
          <Likes count={likes.count} onLikeClick={onLikeClick} />
        </span>
      </div>
      <div className="commentBox">
        <CommentForm postId={postId} />
      </div>
      <CommentsList comments={comments} />
    </div>
  )
}

export default Post
