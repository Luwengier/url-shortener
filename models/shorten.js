const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenSchema = new Schema({
  inputUrl: {
    type: String,
    required: true
  },
  newUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Shorten', shortenSchema)