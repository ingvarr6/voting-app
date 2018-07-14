import mongoose from 'mongoose'

const Schema = mongoose.Schema

const VoteSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "userRequired"],
  },
  username: {
    type: String
  },
  title: {
    type: String,
    required: [true, "titleRequired"],
    minlength: [3, "tooShort"],
    maxlength: [160, "tooLong"]
  },
  options: {
    type: Object,
    required: [true, "optionRequired"],
    minlength: [1, "tooShort"],
    maxlength: [60, "tooLong"],
  },
  votedBy:{
    type: Array
  }
})

const Vote = mongoose.model('Vote', VoteSchema)
