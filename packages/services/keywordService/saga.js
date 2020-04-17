import {
  alertActions,
  backendServiceUtils,
  keywordActions,
} from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleKeywords(action) {
  const { operation, modelType, info } = action.payload
  try {
    const response = yield backendServiceUtils.callBackend({
      operation,
      modelType,
      info,
    })
    const { collection = [], total = 0 } = response.data
    console.log('########## watchHanleKeyword response.data', response.data)
    yield put(keywordActions.setKeywords(collection))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

// export function* watchGetKeywords() {
//   try {
//     const res = yield backendServiceUtils.callBackend('read', {
//       type: 'keyword',
//     })

//     yield put(keywordActions.setKeywords(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

// export function* watchSetKeyword(action) {
//   const { _id } = action.payload.info
//   const actionType = _id ? 'update' : 'create'
//   try {
//     const res = yield backendServiceUtils.callBackend(actionType, {
//       type: 'keyword',
//       info: action.payload.info,
//     })

//     yield put(keywordActions.getKeywords(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

export default function* rootSaga() {
  yield takeLatest('keyword/handleKeywords', watchHandleKeywords)
}
