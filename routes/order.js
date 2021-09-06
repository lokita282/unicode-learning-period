const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/order')


//Create new Order
router.post('/new', auth, createOrder)

//Get Orders
router.get('/get', auth, getOrders)

//update Order
router.put('/update/:id', auth, updateOrder)

//Delete Order
router.delete('/delete/:id', auth, deleteOrder)

module.exports = router