const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  data: { type: Array, required: true },
})

module.exports = mongoose.model('Category', CategorySchema)
