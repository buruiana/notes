import { createSlice } from '@reduxjs/toolkit'
import * as utils from './utils'

const backendService = createSlice({
  name: 'backend',
  initialState: {},
  reducers: {
    createItem: (state, action) => {},
    readItem: (state, action) => {},
    updateItem: (state, action) => {},
    deleteItem: (state, action) => {},
    setItem: (state, action) => {
      state.collections = action.payload
    },
  },
})

const { actions, reducer } = backendService
export { actions as backendServiceActions }
export { reducer as backendServiceReducer }
export { utils as backendServiceUtils }
