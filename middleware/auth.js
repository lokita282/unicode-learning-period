const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token })

    if(!user) {
      throw new Error()
    }

    req.user = user

    next()
  } catch(e) {
    res.status(401).json({
      success: false,
      message: 'Please authenticate'
    })
  }
}

module.exports = auth