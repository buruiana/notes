import { createSelector } from '@reduxjs/toolkit'

const categories = (state) => state.categoryServiceReducer.categories
export const categorySelector = createSelector(categories, (items) => items)

export const idByCatTitle = createSelector([categories], (res) => (cat) =>
  res.categories
    .find((e) => e.categoryTitle.toLowerCase() === cat.toLowerCase())
    .categoryId.toLowerCase(),
)
export const idByCatSubCatTitle = createSelector(
  [categories],
  (res) => (cat, subcat) =>
    res.categories
      .find((e) => e.categoryTitle.toLowerCase() === cat.toLowerCase())
      .subcategories.find(
        (s) => s.subcategoryTitle.toLowerCase() === subcat.toLowerCase(),
      ).subcategoryId,
)
