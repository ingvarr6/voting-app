import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import {loadUserPolls} from '../actions/VoteActions'
import UserPollsList from '../components/UserPollsList.js'

class UserPolls extends Component {

  componentDidMount() {
    this.props.loadUserPolls()
  }

  render() {
    const {isAuth} = this.props.Auth
    const {isFetching, votesList} = this.props.votes
    if (!isAuth) {
      return (<Redirect to='/'/>)
    }
    return (
      <div>
        <Grid>
          <Col sm={8} xsOffset={2}>
            <h1>Voting</h1>
            <h4>Select a poll to see the results and vote,
              <Link to='/newpoll'>or make a new poll!</Link>
            </h4>
            <Jumbotron>
              <UserPollsList isFetching={isFetching} votesList={votesList}/>
            </Jumbotron>
          </Col>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Auth: state.authReducer,
    votes: state.pollsReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadUserPolls: bindActionCreators(loadUserPolls, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPolls)
