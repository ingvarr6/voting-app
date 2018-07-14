import * as actionType from '../constants/ActionTypes'

import voteApi from '../api'

export const voteOptionRequest = () => ({type: actionType.VOTE_OPTION_REQUEST})
export const voteOptionSuccess = (vote) => ({type: actionType.VOTE_OPTION_SUCCESS, vote})

export const loadVotesRequest = () => ({type: actionType.LOAD_VOTES_REQUEST})
export const loadVotesSuccess = (votes) => ({type: actionType.LOAD_VOTES_SUCCESS, votes})

export const loadVoteOptionsRequest = () => ({type: actionType.LOAD_VOTE_OPTIONS_REQUEST})
export const loadVoteOptionsSuccess = (vote) => ({type: actionType.LOAD_VOTE_OPTIONS_SUCCESS, vote})

export const loadUserVotesSuccess = (votes) => ({type: actionType.LOAD_USER_VOTES_SUCCESS, votes})

export const removeVote = (id) => ({type: actionType.REMOVE_VOTE_SUCCESS, id})


export const createPollSuccess = (vote) => ({type: actionType.CREATE_POLL_SUCCESS, vote})


export const createPoll = (title, options) => {
  return (dispatch) => {
    return voteApi.createPoll(title, options).then(votes => {
      dispatch(createPollSuccess(votes.data))
      window.location.replace(`/vote/${votes.data._id}`)
    }).catch(error => {
      throw(error)
    })
  }
}

export const remove = (id) => {
  return (dispatch) => {
    return voteApi.removeVote(id).then(votes => {
      dispatch(removeVote(id))
      window.location.replace('/')
    }).catch(error => {
      throw(error)
    })
  }
}

export const loadUserPolls = () => {
  return (dispatch) => {
    dispatch(loadVotesRequest())
    return voteApi.getUserVotes().then(votes => {
      (votes.data.msg !== undefined)
        ? window.location.replace('/logout')
        : dispatch(loadUserVotesSuccess(votes.data))
    }).catch(error => {
      throw(error)
    })
  }
}

export const postVoteOption = (_id, option) => {
  return (dispatch) => {
    dispatch(voteOptionRequest())
    return voteApi.voteForOption(_id, option).then(vote => {
      (vote.data.msg !== undefined)
        ? alert(vote.data.msg)
        :
        dispatch(voteOptionSuccess(vote.data))
    }).catch(error => {
      throw(error)
    })
  }
}

export const loadVotes = () => {
  return (dispatch) => {
    dispatch(loadVotesRequest())
    return voteApi.getAllVotes().then(votes => {
      dispatch(loadVotesSuccess(votes.data))
    }).catch(error => {
      throw(error)
    })
  }
}

export const loadVoteOptions = (_id) => {
  return (dispatch) => {
    dispatch(loadVoteOptionsRequest())
    return voteApi.getVoteOptions(_id).then(vote => {
      dispatch(loadVoteOptionsSuccess(vote.data))
    }).catch(error => {
      throw(error)
    })
  }
}
