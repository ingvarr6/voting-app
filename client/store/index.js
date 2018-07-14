import { createStore, applyMiddleware, compose } from 'redux'
import voteReducer from '../reducers/index'
import thunk from 'redux-thunk'
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';

const store = createStore(
  voteReducer,
  compose(applyMiddleware(thunk, createCookieMiddleware(Cookies)))
)

export default store
