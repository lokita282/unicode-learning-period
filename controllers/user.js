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

//Logout User
exports.logoutUser = async(req, res) => {
  try{
    req.tokens === ''
    // await req.data.save()

    res.json({
      sucess: true, 
      message: 'Logged out successfully'
    })
  } catch(e) {
    console.log(e)
    res.status(500).json({
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

//Get Personal Profile
exports.getProfile = async (req,res) => {
  try{
    const user = await req.user
    res.json({
      success: true,
      data: user
    })
  } catch(e) {
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

//Update user details
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'contact']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send({error: 'invalid Updates'})
  }
  if (!req.user){
    return res.status(401).json({
      success: false,
      message: "Please login"
    })
  }

  try{    
    updates.forEach((update) => req.user[update] = req.body[update])

    req.user.save()

    res.send(req.user)
  }catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Delete User
exports.deleteUser = async (req, res) => {
  if (!req.user){
    return res.status(401).json({
      success: false,
      message: "Please login"
    })
  }
  try{
    await User.findByIdAndDelete(req.user._id)
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

