const Order = require('../models/Order')
const Artwork = require('../models/Artwork')
const User = require('../models/User')

//Create a order
exports.createOrder = async (req, res) => {
  try{
     //const order = new Order(req.body)
     const order = new Order({
       ...req.body,
       orderedBy: req.user._id
     })
     await order.save()
     res.status(201).json({
       success: true,
       data: order
     })

  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Get all orders
exports.getOrders = async (req, res) => {
  try{
    const orders = await Order.find({orderedBy: req.user._id})
    res.json({
      success: true,
      data: orders
    })
  } catch(e) {
    res.json({
      success: false,
      message: e.message
    })
  }	
}

//Update order details
exports.updateOrder = async (req, res) => {
  try{
    const order = await Order.findOneAndUpdate({_id: req.params._id, orderedBy: req.user._id} , req.body, {new: true})

    if(!order) {
      res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }
    res.json({
      success: true,
      data: order
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Delete Order
exports.deleteOrder = async (req, res) => {
  try{
    await Order.findOneAndDelete({_id: req.params._id, orderedBy: req.user._id})
    res.json({
      success: true,
      data: "Order deleted successfully"
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

