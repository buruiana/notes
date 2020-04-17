const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  likes: { type: Number, required: true },
})

module.exports = mongoose.model('Comment', CommentSchema)

