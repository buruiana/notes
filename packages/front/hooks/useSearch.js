import { postActions } from '@just4dev/services'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useSearch = ({ q }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (q) {
      dispatch(
        postActions.search({
          operation: 'search',
          modelType: 'post',
          info: {
            search: q,
          },
          query: {},
        }),
      )
    }
  }, [q])

  return {}
}
