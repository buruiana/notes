import { keywordActions, keywordSelectors } from '@just4dev/services'
import isEmpty from 'lodash/isEmpty'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useKeywords = () => {
  const dispatch = useDispatch()
  const keywords = useSelector(keywordSelectors.keywordSelector) || []

  useEffect(() => {
    if (isEmpty(keywords)) {
      dispatch(
        keywordActions.handleKeywords({
          operation: 'read',
          modelType: 'keyword',
          query: {},
        }),
      )
    }
  }, [keywords])

  return {
    keywords,
  }
}
