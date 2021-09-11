const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findOne({_id: decoded._id})

    if(!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
  } catch(e) {
    res.status(401).json({
      success: false,
      message: 'Please authenticate'
    })
  }
}

// const isAdmin = (req, res, next) => {
//   console.log('y')
//   if ((req.user) && (req.user.role === "admin" || req.user.role === "Admin" || req.user.role === "ADMIN")) {
//     next()
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'Not authorized as admin'
//     })
//   }
// }

module.exports = auth
 //module.exports = { protect, isAdmin }
