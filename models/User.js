const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  }, 
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    unique: [true, 'Email already taken'],
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error ('email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  contact: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    required: [true, 'Please provide a contact number']
  }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)