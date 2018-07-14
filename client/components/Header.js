import React, {Component} from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Header extends Component {
  render() {
    const {isAuth, username} = this.props.auth
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Navbar.Link href="/">Voting App</Navbar.Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            <Navbar.Link href="/">Home</Navbar.Link>
            {
              !isAuth
              ? <Navbar.Link style={{marginLeft: '25px',color: '#337ab7'}} href="URL_YOU_SERVER">Login with twitter</Navbar.Link>
              :
              <span>
                <Navbar.Link style={{marginLeft: '25px',color: '#337ab7'}} href="/mypolls">My Polls</Navbar.Link>
                <Navbar.Link style={{marginLeft: '25px',color: '#337ab7'}} href="/newpoll">New Poll</Navbar.Link>
                <Navbar.Link style={{marginLeft: '25px',color: '#337ab7'}} href="/logout">Sign out</Navbar.Link>
              </span>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {auth: state.authReducer}

}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
