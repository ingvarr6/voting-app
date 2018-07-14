import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

class UserPollsList extends Component {

  render() {
    const {votesList, isFetching} = this.props
    const isEmpty = votesList.length === 0
    return (
      <div>
        <ListGroup>
          { isEmpty ?
            isFetching ? <h4>Loading...</h4> : <h4>Empty</h4>
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

export default UserPollsList
