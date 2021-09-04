const User = require('../models/User')

//Register a user
exports.registerNewUser = async (req, res) => {
  try{
     const user = new User(req.body)
     const token = await user.generateAuthToken()
     await user.save()
     res.status(201).json({
       success: true,
       data: user,
       token
     })

  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Login user
exports.loginUser = async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.json({
      success: true,
      data: user,
      token
    })
  } catch(e) {
    res.json({
      success: false,
      message: e.message
    })
  }
}

//Get all users
exports.getUsers = async (req, res) => {
  try{
    const users = await User.find({})
    res.json({
      success: true,
      data: users
    })
  } catch(e) {
    res.json({
      success: false,
      message: e.message
    })
  }	
}

//Update user details
exports.updateUser = async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate({_id: req.params.id} , req.body, {new: true})

    if(!user) {
      res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    res.json({
      success: true,
      data: user
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Delete User
exports.deleteUser = async (req, res) => {
  try{
    await User.findByIdAndDelete(req.params.id)
    res.json({
      success: true,
      data: "User deleted successfully"
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

