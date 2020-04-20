import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const categoryService = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    handleCategories: () => undefined,
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

const { actions, reducer } = categoryService
export { actions as categoryActions }
export { reducer as categoryServiceReducer }
export { selectors as categorySelectors }
