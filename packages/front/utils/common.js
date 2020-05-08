import isEmpty from 'lodash/isEmpty'

export const getCategoryName = ({ category, subcategory, categories }) => {
  if (isEmpty(categories)) return { subcategories: [] }
  if (category && subcategory) {
    const cat = categories.find((e) => e.categoryId === category)
    const subcat = cat.subcategories.find(
      (e) => e.subcategoryId === subcategory,
    )

    return {
      subcategoryTitle: subcat.subcategoryTitle,
      categoryTitle: cat.categoryTitle,
    }
  } else if (category && !subcategory) {
    const title = categories.find((e) => e.categoryId === category)
      .categoryTitle
    return { categoryTitle }
  }
  return null
}
