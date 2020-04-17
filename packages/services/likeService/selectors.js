import { createSelector } from '@reduxjs/toolkit'

const likes = (state) => state.likeServiceReducer.likes
export const likeSelector = createSelector(likes, (items) => items)
