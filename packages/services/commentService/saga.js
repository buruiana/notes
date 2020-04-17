import {
  alertActions,
  backendServiceUtils,
  commentActions,
} from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleComments(action) {
  const { operation, modelType, info } = action.payload
  try {
    const response = yield backendServiceUtils.callBackend({
      operation,
      modelType,
      info,
    })
    const { collection = [], total = 0 } = response.data
    console.log('########## watchHandleComments response.data', response.data)
    yield put(commentActions.setKeywords(collection))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

// export function* watchSetComment(action) {
//   try {
//     const res = yield callBackend('create', {
//       type: action.payload.type,
//       info: action.payload.info,
//     })

//     yield put(commentActions.getComments(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

export default function* rootSaga() {
  // yield takeLatest('comment/getComments', watchGetComments)
  // yield takeLatest('comment/setComment', watchSetComment)
  yield takeLatest('comment/handleComments', watchHandleComments)
}
