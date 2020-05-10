import { categorySelectors } from '@just4dev/services'
import { useSelector } from 'react-redux'

export const useCategories = () => {
  const { categories = [] } = useSelector(
    categorySelectors.categorySelector,
  ) || { categories: [] }

  return {
    categories,
  }
}
