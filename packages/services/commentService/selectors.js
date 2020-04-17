import { createSelector } from '@reduxjs/toolkit'

const comments = (state) => state.commentServiceReducer.comments
export const commentSelector = createSelector(comments, items => items)
