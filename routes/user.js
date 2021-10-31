import express from'express'
import auth from'../middleware/auth.js'
import isAdmin from'../middleware/isAdmin.js'
import {
  registerNewUser,
  loginUser,
  upload,
  addPfp,
  viewPfp,
  errorHandler,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser
} from'../controllers/user.js'

const router = new express.Router()

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Add profile picture
router.post('/me/profilePicture', auth, upload.single('profilePicture'), addPfp, errorHandler)

//View the profile picture  
router.get('/me/:id/profilePicture', viewPfp)

//Logout User
router.post('/logout', auth, logoutUser)

//Get All Users
router.get('/get',  getUsers)

//Get Personal Profile
router.get('/me', auth, getProfile)

//update Profile
router.put('/update', auth, updateUser)

//Delete Profile
router.delete('/delete', auth, deleteUser)

export default router