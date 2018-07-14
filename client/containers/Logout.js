import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import * as logout from '../actions/AuthActions.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Logout extends Component {
  render() {
      localStorage.clear()
      console.log(this.props);
      this.props.logout.logout()
      return (<Redirect to="/"/>)
    }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
