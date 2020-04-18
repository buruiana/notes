import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const featureService = createSlice({
  name: 'feature',
  initialState: {
    features: [],
  },
  reducers: {
    handleFeatures: () => undefined,
    setFeatures: (state, action) => {
      state.features = action.payload
    },
  },
})

const { actions, reducer } = featureService
export { actions as featureActions }
export { reducer as featureServiceReducer }
export { selectors as featureSelectors }
