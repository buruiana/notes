import { createSelector } from '@reduxjs/toolkit'

const posts = (state) => state.postServiceReducer.posts
const total = (state) => state.postServiceReducer.total

export const postSelector = createSelector(posts, (items) => items)
export const postTotalSelector = createSelector(total, (items) => items)
export const postByPostUrlSelector = createSelector([posts], (res) => (key) =>
  res.find((e) => e.postUrl === key),
)
export const postByCat = createSelector([posts], (res) => (cat) =>
  res.filter((e) => e.category === cat),
)
export const postByCatSubCat = createSelector([posts], (res) => (cat, subcat) =>
  res.filter((e) => e.category === cat && e.subcategory === subcat),
)
