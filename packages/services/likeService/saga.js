import {
  alertActions,
  backendServiceUtils,
  likeActions,
} from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleLikes(action) {
  const { operation, modelType, info } = action.payload
  try {
    const response = yield backendServiceUtils.callBackend({
      operation,
      modelType,
      info,
    })
    const { collection = [] } = response.data
    yield put(likeActions.setLikes(collection[0]))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

// export function* watchSetLike(action) {
//   const { _id, postId, count } = action.payload
//   const actionType = _id ? 'update' : 'create'
//   try {
//     const res = yield backendServiceUtils.callBackend(actionType, {
//       type: 'like',
//       info: { postId, count, _id },
//     })

//     yield put(likeActions.getLikes(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

export default function* rootSaga() {
  yield takeLatest('like/handleLikes', watchHandleLikes)
}
