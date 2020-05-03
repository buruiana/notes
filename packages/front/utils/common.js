import isEmpty from 'lodash/isEmpty'

export const getCategoryName = ({ category, subcategory, categories }) => {
  if (isEmpty(categories)) return { subcategories: [] }
  if (category && subcategory) {
    return categories
      .find((e) => e.categoryId === category)
      .subcategories.find((e) => e.subcategoryId === subcategory)
      .subcategoryTitle
  } else if (category && !subcategory) {
    return categories.find((e) => e.categoryId === category).categoryTitle
  }
  return null
}
