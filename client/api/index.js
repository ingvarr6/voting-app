import axios from 'axios'
import { apiPrefix } from '../../etc/config.json'

export default {
  getAllVotes() {
    return axios.get(`${apiPrefix}/votes`)
  },
  getVoteOptions(_id) {
    return axios.get(`${apiPrefix}/vote/${_id}`)
  },
  voteForOption(_id, option) {
    axios.defaults.withCredentials = true;
    return axios.post(`${apiPrefix}/vote_opt`, {
      _id: _id,
      option: option
    })
  },
  authRequest() {
    axios.defaults.withCredentials = true;
    return axios.get(`${apiPrefix}/auth`)
  },
  getUserVotes() {
    axios.defaults.withCredentials = true;
    return axios.get(`${apiPrefix}/uservotes`)
  },
  logout() {
    axios.defaults.withCredentials = true;
    return axios.get(`${apiPrefix}/logout`)
  },
  removeVote(id) {
    axios.defaults.withCredentials = true;
    return axios.post(`${apiPrefix}/remove_vote`, {
      id: id
    })
  },
  createPoll(title, options) {
    axios.defaults.withCredentials = true;
    return axios.post(`${apiPrefix}/createpoll`, {
      title: title,
      options: options
    })
  }
}
