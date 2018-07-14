import * as actionType from '../constants/ActionTypes'

import authApi from '../api'

export const authRequest = (auth) => ({type: actionType.AUTH_REQUEST, auth})
export const authLogout = () => ({type: actionType.LOGOUT})

export const postAuth = () => {
  return (dispatch) => {
    return authApi.authRequest().then(auth => {
      dispatch(authRequest(auth.data))
    }).catch(error => {
      throw(error)
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    return authApi.logout().then(data =>{
      dispatch(authLogout())
    }).catch(error => {
      throw(error)
    })
  }
}
