import { combineReducers } from 'redux'
import pollsReducer from './polls'
import authReducer from './auth'

const voteReducer = combineReducers({
  pollsReducer,
  authReducer
})

export default voteReducer
