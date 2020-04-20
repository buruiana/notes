import { createSelector } from '@reduxjs/toolkit'

const categories = (state) => state.categoryServiceReducer.categories
export const categorySelector = createSelector(categories, (items) => items)
