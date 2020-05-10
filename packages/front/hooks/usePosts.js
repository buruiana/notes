import { categorySelectors, postSelectors } from '@just4dev/services'
import { useSelector } from 'react-redux'

export const usePosts = ({ cat, subcat, q }) => {
  let posts = []
  let total = 0
  const catId = cat
    ? useSelector(categorySelectors.idByCatTitle)(cat)
    : undefined

  const subcatId =
    cat && subcat
      ? useSelector(categorySelectors.idByCatSubCatTitle)(cat, subcat)
      : undefined

  if (q) {
    posts = useSelector(postSelectors.searchPostSelector) || []
    total = posts.length
  } else if (catId && subcatId) {
    posts = useSelector(postSelectors.postByCatSubCat)(catId, subcatId) || []
    total = useSelector(postSelectors.totalsCatSubCat)({ catId, subcatId })
  } else if (catId && !subcatId) {
    posts = useSelector(postSelectors.postByCat)(catId) || []
    total = useSelector(postSelectors.totalsCatSubCat)({ catId })
  } else {
    posts = useSelector(postSelectors.postSelector) || []
    total = useSelector(postSelectors.totalsCatSubCat)({})
  }

  return {
    posts,
    total,
  }
}
