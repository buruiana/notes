const mongoose = require('mongoose')

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
})

module.exports = mongoose.model('Feature', FeatureSchema)
