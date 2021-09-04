const express = require('express')
const router = new express.Router()
const {
  registerNewUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user')

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Get Users
router.get('/get', getUsers)

//update User
router.put('/update/:id', updateUser)

//Delete User
router.delete('/delete/:id', deleteUser)

module.exports = router