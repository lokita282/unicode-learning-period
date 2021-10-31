import multer from 'multer';
import sharp from 'sharp';
import { sendWelcomeEmail, sendCancellationEmail} from '../emails/account.js'
import User from '../models/User.js';

//Register a user
const registerNewUser = async (req, res) => {
  try{
     const user = new User(req.body)
     const token = await user.generateAuthToken()
     await user.save()
     sendWelcomeEmail(user.email, user.name)
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

//Add profile picture
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.jpg|jpeg|png/)) {
      return cb(new Error('Please upload image format'))
    }

    cb(undefined, true)
  }
})


const addPfp = async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.profilePic = buffer
  await req.user.save()
  res.json({
    success: true
  })
}

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.message })
}

//View the profile picture
const viewPfp = async(req, res) => {
  try{
    const user = await User.findById(req.params.id)
    console.log('here')
    if(!user || !user.profilePic) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.profilePic)
  } catch (e) {    
    res.status(404).json({
      success: false,
      message: e
    })
  } 
}

//Login user
const loginUser = async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.json({
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

//Logout User
const logoutUser = async(req, res) => {
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
const getUsers = async (req, res) => {
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
const getProfile = async (req,res) => {
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
const updateUser = async (req, res) => {
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
const deleteUser = async (req, res) => {
  if (!req.user){
    return res.status(401).json({
      success: false,
      message: "Please login"
    })
  }
  try{
    await req.user.remove()
    sendCancellationEmail(req.user.email, req.user.name)
    res.json({
      success: true,
      data: "User deleted successfully"
    })
  } catch(e) {
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

export {
  registerNewUser,
  upload,
  addPfp,
  errorHandler,
  viewPfp,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser
}

