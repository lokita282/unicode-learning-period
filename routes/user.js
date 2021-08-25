const express = require('express')
const router = new express.Router()
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user')

//Create new user
router.post('/new', createUser)

//Get Users
router.get('/get', getUsers)

//update User
router.put('/update/:id', updateUser)

//Delete User
router.delete('/delete/:id', deleteUser)

module.exports = router