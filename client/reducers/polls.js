import * as actionType from '../constants/ActionTypes'

const initState = {
  isFetching: false,
  votesList: []
}

const pollsReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.VOTE_OPTION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionType.VOTE_OPTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        votesList: action.vote
      }
    case actionType.LOAD_VOTES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionType.LOAD_VOTES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        votesList: action.votes,
        userId: action.user_id
      }
    case actionType.LOAD_VOTE_OPTIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionType.LOAD_VOTE_OPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        votesList: action.vote
      }
    case actionType.LOAD_USER_VOTES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        votesList: action.votes
      }
    case actionType.CREATE_POLL_SUCCESS:
      console.log(action.vote);
      return {
        ...state,
        votesList: action.vote
      }
    default:
      return state
  }
}

export default pollsReducer
