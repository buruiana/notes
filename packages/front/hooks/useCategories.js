import { categorySelectors } from '@just4dev/services'
import { useSelector } from 'react-redux'

export const useCategories = ({ cat = null, subcat = null }) => {
  const { categories = [] } = useSelector(
    categorySelectors.categorySelector,
  ) || { categories: [] }

  const meta =
    cat && subcat
      ? useSelector(categorySelectors.metaByCatSubCatTitle)(cat, subcat)
      : cat
      ? useSelector(categorySelectors.metaByCatTitle)(cat)
      : {}

  return {
    categories,
    meta,
  }
}
