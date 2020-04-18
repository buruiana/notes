import { alertActions, callBackend, likeActions } from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleLikes(action) {
  const { operation, modelType, info, query } = action.payload
  let response = {}
  try {
    if (operation !== 'read') {
      response = yield callBackend({
        operation,
        modelType,
        info,
        query,
      })
      response = yield callBackend({
        operation: 'read',
        modelType: 'like',
        query: {},
      })
    } else {
      response = yield callBackend({
        operation,
        modelType,
        query,
      })
    }

    const { collection = [] } = response.data
    yield put(likeActions.setLikes(collection))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('like/handleLikes', watchHandleLikes)
}
