import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const keywordService = createSlice({
  name: 'keyword',
  initialState: {
    keywords: [],
  },
  reducers: {
    handleKeywords: () => undefined,
    getKeywords: () => undefined,
    setKeyword: () => undefined,
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
    resetKeywords: (state) => {
      state.keywords = []
    },
  },
})

const { actions, reducer } = keywordService
export { actions as keywordActions }
export { reducer as keywordServiceReducer }
export { selectors as keywordSelectors }
