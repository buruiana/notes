import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const alertService = createSlice({
  name: 'alert',
  initialState: {
    alerts: [],
  },
  reducers: {
    getAlerts: () => undefined,
    setAlert: (alert) => undefined,
  },
})

const { actions, reducer } = alertService
export { actions as alertActions }
export { reducer as alertServiceReducer }
export { selectors as alertSelectors }
