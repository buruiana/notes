import { createSelector } from '@reduxjs/toolkit'

const categories = (state) => state.categoryServiceReducer.categories
export const categorySelector = createSelector(categories, (items) => items)

export const idByCatTitle = createSelector([categories], (res) => (cat) => {
  const filter = res.categories.find(
    (e) => e.categoryTitle.toLowerCase() === cat.toLowerCase(),
  )
  return filter ? filter.categoryId.toLowerCase() : null
})
export const idByCatSubCatTitle = createSelector(
  [categories],
  (res) => (cat, subcat) => {
    const filter = res.categories
      .find((e) => e.categoryTitle.toLowerCase() === cat.toLowerCase())
      .subcategories.find(
        (s) => s.subcategoryTitle.toLowerCase() === subcat.toLowerCase(),
      )
    return filter ? filter.subcategoryId.toLowerCase() : null
  },
)

export const metaByCatTitle = createSelector([categories], (res) => (cat) =>
  res.categories
    .find((e) => e.categoryTitle.toLowerCase() === cat.toLowerCase())
    .categoryId.toLowerCase(),
)
