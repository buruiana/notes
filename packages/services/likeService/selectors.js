import { createSelector } from '@reduxjs/toolkit'

const likes = (state) => state.likeServiceReducer.likes
export const likeSelector = createSelector(likes, (items) => items)
export const likesByPostIdSelector = createSelector([likes], (res) => (id) =>
  res.filter((e) => e.postId === id),
)
