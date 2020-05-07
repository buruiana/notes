import { alertActions, callBackend, postActions } from '@just4dev/services'
import uniqBy from 'lodash/uniqBy'
import { put, select, takeLatest } from 'redux-saga/effects'

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
        info,
      })
    } else {
      response = yield callBackend({
        operation,
        modelType,
        query,
        info,
      })
    }

    const { collection = [], total = 0 } = response.data

    if (info && info.limit) {
      const posts = (yield select()).postServiceReducer.posts || []
      yield put(
        postActions.setPosts({
          posts: uniqBy([...posts, ...collection], '_id'),
          total,
        }),
      )
    } else {
      yield put(postActions.setPosts({ posts: collection, total }))
    }
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export function* watchTotalsByCategory(action) {
  let response = {}
  try {
    response = yield callBackend({
      operation: 'totalsByCategory',
    })

    const { collection = [] } = response.data

    yield put(postActions.setTotalsByCategory({ totalsByCategory: collection }))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export function* watchSearch(action) {
  const { operation, modelType, info, query } = action.payload
  let response = {}
  try {
    response = yield callBackend({
      operation,
      modelType,
      query,
      info,
    })

    const { collection = [], total = 0 } = response.data

    yield put(
      postActions.setSearchResults({ term: info.search, collection, total }),
    )
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('post/handlePosts', watchHandlePosts)
  yield takeLatest('post/getTotalsByCategory', watchTotalsByCategory)
  yield takeLatest('post/search', watchSearch)
}
