import { alertActions, callBackend, postActions } from '@just4dev/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandlePosts(action) {
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
        modelType: 'post',
        query: {},
      })
    } else {
      response = yield callBackend({
        operation,
        modelType,
        query,
      })
    }

    const { collection = [], total = 0 } = response.data

    yield put(postActions.setPosts({ posts: collection, total }))
    // if (info && info.limit) {
    //   const posts = (yield select()).postServiceReducer.posts || []
    //   yield put(
    //     postActions.setPosts({
    //       posts: [...posts, ...collection],
    //       total,
    //     }),
    //   )
    // } else {
    //   yield put(postActions.setPosts({ posts: collection, total }))
    // }
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('post/handlePosts', watchHandlePosts)
}
