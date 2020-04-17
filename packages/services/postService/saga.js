import {
  alertActions,
  backendServiceUtils,
  postActions,
} from '@just4dev/services'
import { put, select, takeLatest } from 'redux-saga/effects'

export function* watchHandlePosts(action) {
  const { operation, modelType, info } = action.payload
  try {
    const response = yield backendServiceUtils.callBackend({
      operation,
      modelType,
      info,
    })
    const { collection = [], total = 0 } = response.data
    const posts = (yield select()).postServiceReducer.posts || []

    yield put(
      postActions.setPosts({
        posts: [...posts, ...collection],
        total,
      }),
    )
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

// export function* watchSetPost(action) {
//   const actionType = action._id ? 'update' : 'create'
//   try {
//     const res = yield backendServiceUtils.callBackend(actionType, {
//       type: action.payload.type,
//       info: action.payload.info,
//     })

//     yield put(postActions.getPosts(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

// export function* watchDeletePost(action) {
//   const actionType = action._id ? 'update' : 'create'
//   try {
//     const res = yield backendServiceUtils.callBackend(actionType, {
//       type: action.payload.type,
//       info: action.payload.info,
//     })

//     yield put(postActions.getPosts(res.data))
//   } catch (error) {
//     yield put(alertActions.setAlert(error.message))
//   }
// }

export default function* rootSaga() {
  yield takeLatest('post/handlePosts', watchHandlePosts)
}
