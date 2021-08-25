const express = require('express')
const router = new express.Router()
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/order')


//Create new Order
router.post('/new', createOrder)

//Get Orders
router.get('/get', getOrders)

//update Order
router.put('/update/:id', updateOrder)

//Delete Order
router.delete('/delete/:id', deleteOrder)

module.exports = router