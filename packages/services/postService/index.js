import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const postService = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    total: 0,
    totalsByCategory: {},
  },
  reducers: {
    handlePosts: () => undefined,
    setPosts: (state, action) => {
      state.posts = action.payload.posts
      state.total = action.payload.total
    },
    resetPosts: (state) => {
      state.posts = []
    },
    getTotalsByCategory: () => undefined,
    setTotalsByCategory: (state, action) => {
      state.totalsByCategory = action.payload.totalsByCategory
    },
  },
})

const { actions, reducer } = postService
export { actions as postActions }
export { reducer as postServiceReducer }
export { selectors as postSelectors }
