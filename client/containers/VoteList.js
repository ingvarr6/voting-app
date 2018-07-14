import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import {connect} from 'react-redux'

class VoteList extends Component {
  render() {
    const {votesList, isFetching} = this.props.votes
    const isEmpty = votesList.length === 0
    return (
      <div>
        <ListGroup>
          {isEmpty
            ? isFetching
              ? <h4>Loading...</h4>
              : <h4>Empty</h4>
            : votesList.map((vote, i) => {
              return (
                <ListGroupItem key={i} href={`vote/${vote._id}`}>{vote.title}</ListGroupItem>
              )
            })}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {votes: state.pollsReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteList)
