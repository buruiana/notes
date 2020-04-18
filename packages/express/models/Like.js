const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  postId: { type: String, required: true },
})

module.exports = mongoose.model('Like', LikeSchema)
