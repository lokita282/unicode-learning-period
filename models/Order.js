const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: [true, 'Please add the User who is ordering']
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    unique: true,
    required: [true, 'Please add the artwork Id']
  }],
  paymentMode: {
    type: String,
    required: [true, 'Please enter the payment mode']
  }
},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema)