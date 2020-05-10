import { postActions, postSelectors } from '@just4dev/services'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const usePostForm = ({ id }) => {
  const dispatch = useDispatch()
  const record = id ? useSelector(postSelectors.postByPostUrlSelector)(id) : {}
  useEffect(() => {
    if (!record._id) {
      dispatch(
        postActions.handlePosts({
          operation: 'read',
          modelType: 'post',
          query: { postUrl: id },
        }),
      )
    }
  }, [record._id])

  return {
    record,
  }
}
