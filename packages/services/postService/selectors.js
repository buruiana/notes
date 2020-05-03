import { createSelector } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'

const posts = (state) => state.postServiceReducer.posts
const total = (state) => state.postServiceReducer.totalsByCategory

export const postSelector = createSelector(posts, (items) => items)
export const postByPostUrlSelector = createSelector([posts], (res) => (key) =>
  res.find((e) => e.postUrl.toLowerCase() === key.toLowerCase()),
)

export const postByCat = createSelector([posts], (res) => (cat) =>
  res.filter((e) => e.category.toLowerCase() === cat.toLowerCase()),
)
export const postByCatSubCat = createSelector([posts], (res) => (cat, subcat) =>
  res.filter(
    (e) =>
      e.category.toLowerCase() === cat.toLowerCase() &&
      e.subcategory.toLowerCase() === subcat.toLowerCase(),
  ),
)

export const totalsCatSubCat = createSelector(
  [total],
  (res) => ({ catId = null, subcatId = null }) => {
    if (isEmpty(res)) return 0

    const bySubCat =
      catId && subcatId
        ? res
            .find((e) => e._id === catId)
            .bySubCatCount.find((e) => e.subcategory === subcatId).count
        : 0
    const byCat =
      catId && !subcatId ? res.find((e) => e._id === catId).byCatCount : 0
    const allPosts =
      !catId && !subcatId
        ? res.map((e) => e.byCatCount).reduce((a, b) => a + b, 0)
        : 0

    return catId && subcatId ? bySubCat : catId && !subcatId ? byCat : allPosts
  },
)
