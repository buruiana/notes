import commentSaga from '@just4dev/services/commentService/saga'
import keywordSaga from '@just4dev/services/keywordService/saga'
import likeSaga from '@just4dev/services/likeService/saga'
import postSaga from '@just4dev/services/postService/saga'
import { all, fork } from 'redux-saga/effects'

export default function* sagas() {
  yield all(
    [postSaga, commentSaga, keywordSaga, likeSaga].map((saga) => fork(saga)),
  )
}
