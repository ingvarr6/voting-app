import mongoose from 'mongoose'
mongoose.Promise = require('bluebird');

import '../models/Vote'

import config from '../config/config.json'

const Vote = mongoose.model('Vote')

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listVotes() {
  return Vote.find().select('title')
}

export function getVoteOptions(id) {
  return Vote.findById(id).select('title options user_id')
}

export function voteForOption(id, option, votedBy) {
  return Vote.findByIdAndUpdate(id, {
    $push: {
      votedBy: votedBy
    },
    $inc: {
      ["options." + option]: 1
    }
  }, {new: true})
}

export function findVoted(id, votedBy) {
  return Vote.find({_id: id, votedBy: votedBy})
}

export function listUserVotes(id) {
  return Vote.find({user_id: id}).select('title')
}

export function removeVotes(vote_id, user_id) {
  return Vote.findOneAndRemove({_id: vote_id, user_id: user_id}).select('title')
}

export function createVote(user_id, username, title, options) {
  var optionsObj = options.reduce((acc, cur) => {
    acc[cur] = 0
    return acc
  }, {})
  return Vote.create({user_id: user_id, username: username, title: title, options: optionsObj})
}
