import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const postService = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    total: 0,
  },
  reducers: {
    handlePosts: () => undefined,
    getPosts: () => undefined,
    setPost: () => undefined,
    deletePost: () => undefined,
    setPosts: (state, action) => {
      state.posts = action.payload.posts
      state.total = action.payload.total
    },
    resetPosts: (state) => {
      state.posts = []
    },
  },
})

const { actions, reducer } = postService
export { actions as postActions }
export { reducer as postServiceReducer }
export { selectors as postSelectors }
