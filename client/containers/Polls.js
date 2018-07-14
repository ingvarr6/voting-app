import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import Chart from '../components/Chart'
import {connect} from 'react-redux'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import VotingPanel from '../components/VotingPanel'
import * as VoteActions from '../actions/VoteActions.js'

class Polls extends Component {

  voteForOptionClick = (id, option) => {
    this.props.actions.postVoteOption(id, option)
  }

  componentDidMount() {
    this.props.actions.loadVoteOptions(this.props.match.params._id)
  }

  handleRemove(){
    const {isAuth} = this.props.auth
    isAuth
    ? this.props.actions.remove(this.props.match.params._id)
    : ''
  }

  render() {
    const isEmpty = this.props.vote.votesList.length === 0
    const {_id, title, options, isFetching} = this.props.vote.votesList
    const user_id = this.props.auth.id
    const user_vode_id = this.props.vote.votesList.user_id
    const {isAuth} = this.props.auth

    return (
      <div>
        <Grid>
          <Col sm={10} xsOffset={1}>
            <Jumbotron>
              <Col sm={6}>
                {isEmpty
                  ? (isFetching ? <h4>Loading...</h4> : <h4>Empty</h4>)
                  : <VotingPanel id={_id} title={title} options={Object.keys(options)} voteOptionClick={this.voteForOptionClick}/>
                }
              </Col>
              <Col xsOffset={8}>
                {isEmpty
                  ? (isFetching ? <h4>Loading...</h4> : <h4>Empty</h4>)
                  : <Chart data={Object.values(options)} options={Object.keys(options)}/>
                }
                <br></br>
                { isAuth && user_id == user_vode_id
                  ? <Button bsStyle="danger" onClick={this.handleRemove.bind(this)}>Remove this poll</Button>
                  : ''
                }
              </Col>
            </Jumbotron>
          </Col>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vote: state.pollsReducer,
    auth: state.authReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(VoteActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Polls)
