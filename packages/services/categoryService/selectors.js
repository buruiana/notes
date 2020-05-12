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

export const metaByCatTitle = createSelector([categories], (res) => (cat) => {
  const filter = res.categories.find(
    (e) => e.categoryTitle.toLowerCase() === cat.toLowerCase(),
  )
  return !filter
    ? null
    : {
        categoryMetaViewport: filter.categoryMetaViewport,
        categoryMetaCharset: filter.categoryMetaCharset,
        categoryMetaKeywords: filter.categoryMetaKeywords,
        categoryMetaTitle: filter.categoryMetaTitle,
        categoryMetaDescription: filter.categoryMetaDescription,
        categoryMetaRobots: filter.categoryMetaRobots,
      }
})

export const metaByCatSubCatTitle = createSelector(
  [categories],
  (res) => (cat, subcat) => {
    const filter = res.categories
      .find((e) => e.categoryTitle.toLowerCase() === cat.toLowerCase())
      .subcategories.find(
        (s) => s.subcategoryTitle.toLowerCase() === subcat.toLowerCase(),
      )
    return !filter
      ? null
      : {
          subcategoryMetaViewport: filter.subcategoryMetaViewport,
          subcategoryMetaCharset: filter.subcategoryMetaCharset,
          subcategoryMetaKeywords: filter.subcategoryMetaKeywords,
          subcategoryMetaTitle: filter.subcategoryMetaTitle,
          subcategoryMetaDescription: filter.subcategoryMetaDescription,
          subcategoryMetaRobots: filter.subcategoryMetaRobots,
        }
  },
)
