const mongoose = require('mongoose')

const KeywordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
})

module.exports = mongoose.model('Keyword', KeywordSchema)
