const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  comment: { type: String, required: true },
  datetime: { type: Date, required: true },
  postId: { type: String, required: true },
})

module.exports = mongoose.model('Comment', CommentSchema)
