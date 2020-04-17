import { createSelector } from '@reduxjs/toolkit'

const keywords = (state) => state.keywordServiceReducer.keywords
export const keywordSelector = createSelector(keywords, items => items)
