import { alertActions, callBackend, commentActions } from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleComments(action) {
  const { operation, modelType, info, query, readQuery } = action.payload
  let response = {}
  try {
    if (operation !== 'read') {
      yield callBackend({
        operation,
        modelType,
        info,
        query,
      })

      response = yield callBackend({
        operation: 'read',
        modelType: 'comment',
        info: { postId: info.postId },
        query: {},
      })
    } else {
      response = yield callBackend({
        operation,
        modelType,
        info,
        query,
      })
    }
    const { collection = [], total = 0 } = response.data
    yield put(commentActions.setComments(collection))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('comment/handleComments', watchHandleComments)
}
