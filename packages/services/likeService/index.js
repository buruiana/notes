import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const likeService = createSlice({
  name: 'like',
  initialState: {
    likes: [],
  },
  reducers: {
    handleLikes: () => undefined,
    setLikes: (state, action) => {
      state.likes = action.payload
    },
  },
})

const { actions, reducer } = likeService
export { actions as likeActions }
export { reducer as likeServiceReducer }
export { selectors as likeSelectors }
