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
  category: { type: String, required: false },
  subcategory: { type: String, required: false },
  priority: { type: String, required: false },
  postMetaKeywords: { type: Array, required: false },
  postMetaTitle: { type: String, required: false },
  postMetaDescription: { type: String, required: false },
  postMetaRobots: { type: String, required: false },
  postMetaViewport: { type: String, required: false },
  postMetaCharSet: { type: String, required: false },
})

module.exports = mongoose.model('Post', PostSchema)
