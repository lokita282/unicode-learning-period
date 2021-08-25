const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: 'User',
    //required: [true, 'Please add the User who is ordering']
  },
  placedAt: {
    type: Date,
    default: Date.now()
  },
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: [true, 'Please add the artwork Id']
  },
  paymentMode: {
    type: String,
    required: [true, 'Please enter the payment mode']
  }
})

module.exports = mongoose.model('Order', orderSchema)