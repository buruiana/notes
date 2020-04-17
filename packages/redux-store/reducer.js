import {
  alertServiceReducer,
  backendServiceReducer,
  commentServiceReducer,
  keywordServiceReducer,
  likeServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
} from '@just4dev/services'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  alertServiceReducer,
  backendServiceReducer,
  commentServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
  keywordServiceReducer,
  likeServiceReducer,
})

export default rootReducer
