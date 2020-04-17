const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  postUrl: { type: String, required: false },
  content: { type: String, required: false },
  shortDescription: { type: String, required: false },
  longDescription: { type: String, required: false },
  keywords: { type: Array, required: false },
  imageName: { type: String, required: false },
  datetime: { type: Date, required: false },
  category: { type: Array, required: false },
  priority: { type: String, required: false }
})

module.exports = mongoose.model('Post', PostSchema)

