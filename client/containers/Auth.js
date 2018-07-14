import React, {Component} from 'react'
import store from '../store/index'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
  render() {
    const search = this.props.location.search
    const params = new URLSearchParams(search)
    if (params.get('isAuth') && params.get('username') && params.get('id'))
       localStorage.setItem('authState', JSON.stringify({isAuth: params.get('isAuth'), username: params.get('username'), id: params.get('id')}))
       store.dispatch({type: 'AUTH_SUCCESS', payload: {username: params.get('username'), id: params.get('id')}})
      return (<Redirect to="/"/>)
    }
}

export default Auth
