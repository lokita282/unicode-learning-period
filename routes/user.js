const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser
} = require('../controllers/user')

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Logout User
router.post('/logout', auth, logoutUser)

//Get All Users
router.get('/get', auth, isAdmin, getUsers)

//Get Personal Profile
router.get('/me', auth, getProfile)

//update Profile
router.put('/update', auth, updateUser)

//Delete Profile
router.delete('/delete', auth, deleteUser)

module.exports = router