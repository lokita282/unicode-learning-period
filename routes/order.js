const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/order')


//Create new Order
router.post('/new', auth, createOrder)

//Get All Orders of logged in user
router.get('/get', auth, isAdmin, getAllOrders)

//Get order by id
router.get('/get/:id', auth, getOrder)

//update Order
router.put('/update/:id', auth, updateOrder)

//Delete Order
router.delete('/delete/:id', auth, deleteOrder)

module.exports = router