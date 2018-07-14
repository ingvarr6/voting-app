import React, {Component} from 'react'
import VoteList from './VoteList'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import {loadVotes} from '../actions/VoteActions'
import store from '../store/index'

class Vote extends Component {

  componentDidMount(){
    store.dispatch(loadVotes())
  }

  render() {
    return (
      <div>
        <Grid>
          <Col sm={8} xsOffset={2}>
            <h1>Voting</h1>
            <h4>Select a poll to see the results and vote, or sign-in to make a new poll.</h4>
            <Jumbotron>
              <VoteList/>
            </Jumbotron>
          </Col>
        </Grid>
      </div>
    )
  }
}

export default Vote
