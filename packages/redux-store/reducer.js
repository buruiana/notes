import {
  alertServiceReducer,
  commentServiceReducer,
  featureServiceReducer,
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
  commentServiceReducer,
  featureServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
  keywordServiceReducer,
  likeServiceReducer,
})

export default rootReducer
