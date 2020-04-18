import { createSelector } from '@reduxjs/toolkit'

const comments = (state) => state.commentServiceReducer.comments
export const commentSelector = createSelector(comments, (items) => items)
export const commentsByPostIdSelector = createSelector(
  [comments],
  (res) => (id) => res.filter((e) => e.postId === id),
)
