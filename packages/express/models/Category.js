const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  categories: { type: Object, required: true },
})

module.exports = mongoose.model('Category', CategorySchema)
