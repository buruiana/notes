import {
  commentActions,
  commentSelectors,
  likeActions,
  likeSelectors,
  postActions,
  postSelectors,
} from '@just4dev/services'
import get from 'lodash/get'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const usePost = ({ id }) => {
  const dispatch = useDispatch()
  const post = useSelector(postSelectors.postByPostUrlSelector)(id) || {}
  const { _id: postId, datetime } = post

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
    if (!postId) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: { postUrl: id },
        }),
      )
    } else {
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
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: {
            datetime: {
              $lte: datetime,
            },
          },
        }),
      )
    }
  }, [postId, datetime])

  return {
    post,
    likes,
    comments,
  }
}
