import {
  commentActions,
  commentSelectors,
  featureSelectors,
  likeActions,
  likeSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import get from 'lodash/get'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import CommentsList from '../components/CommentsList'
import Likes from '../components/Likes'
import CommentForm from '../forms/CommentForm'

const Post = ({ id }) => {
  const dispatch = useDispatch()
  const likeFeature =
    useSelector(featureSelectors.featuresByNameSelector)('like') || {}
  const commentFeature =
    useSelector(featureSelectors.featuresByNameSelector)('comment') || {}
  const post = useSelector(postSelectors.postByPostUrlSelector)(id) || {}
  const { title, content, datetime, _id: postId } = post
  const likes = get(
    useSelector(likeSelectors.likesByPostIdSelector)(postId),
    '[0]',
    {
      postId,
      count: 0,
    },
  )
  const comments =
    useSelector(commentSelectors.commentsByPostIdSelector)(postId) || []

  useEffect(() => {
    if (!post._id) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: { postUrl: id },
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
          query: { postId },
        }),
      )
      dispatch(
        commentActions.handleComments({
          operation: 'read',
          modelType: 'comment',
          query: { postId },
        }),
      )
    }
  }, [postId])

  const onLikeClick = () =>
    dispatch(
      likeActions.handleLikes({
        operation: likes._id ? 'update' : 'create',
        modelType: 'like',
        info: {
          postId,
          count: parseInt(likes.count) + 1,
        },
        query: { _id: likes._id },
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
        {likeFeature.status && (
          <span>
            <Likes count={likes.count} onLikeClick={onLikeClick} />
          </span>
        )}
      </div>
      {commentFeature.status && (
        <>
          <div className="commentBox">
            <CommentForm postId={postId} />
          </div>
          <CommentsList comments={comments} />
        </>
      )}
    </div>
  )
}

export default Post
