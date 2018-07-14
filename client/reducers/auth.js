import * as actionType from '../constants/ActionTypes'

const emptyState = {
  isAuth: false,
  username: '',
  id: ''
}

const persistedState = localStorage.getItem('authState') ? JSON.parse(localStorage.getItem('authState')) : {}
const initState = Object.keys(persistedState).length ? persistedState : emptyState

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.AUTH_SUCCESS:
      console.log(action)
      return {
        isAuth: true,
        username: action.payload.username,
        id: action.payload.id
      }
    case actionType.LOGOUT:
      return {
        ...state,
        isAuth: false,
        username: '',
        id: ''
      }
    default:
      return state
  }
}

export default authReducer
