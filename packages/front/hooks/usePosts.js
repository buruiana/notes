import { categorySelectors, postSelectors } from '@just4dev/services'
import { navigate } from '@reach/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const usePosts = ({ cat, subcat, q }) => {
  let posts = []
  let total = 0

  const catId = cat
    ? useSelector(categorySelectors.idByCatTitle)(cat)
    : undefined

  const subcatId =
    cat && subcat && catId
      ? useSelector(categorySelectors.idByCatSubCatTitle)(cat, subcat)
      : undefined

  useEffect(() => {
    if (!q) {
      if ((cat && subcat && (!catId || !subcatId)) || (cat && !catId)) {
        navigate('/notfound')
      }
    }
  }, [q, cat, subcat, catId, subcatId])

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
