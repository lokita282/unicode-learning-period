const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: Array,
    description: 'Enter length and breadth'

  }
})

module.exports = mongoose.model('Artwork', artworkSchema)