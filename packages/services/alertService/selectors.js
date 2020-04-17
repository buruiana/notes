import { createSelector } from '@reduxjs/toolkit'

const alerts = (state) => state.alertServiceReducer.alerts
export const alertSelector = createSelector(alerts, items => items)
