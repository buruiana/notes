import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const commentService = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
  },
  reducers: {
    handleComments: () => undefined,
    getComments: () => undefined,
    setComments: (state, action) => {
      state.comments = action.payload
    },
    deleteComment: () => undefined,
  },
})

const { actions, reducer } = commentService
export { actions as commentActions }
export { reducer as commentServiceReducer }
export { selectors as commentSelectors }
