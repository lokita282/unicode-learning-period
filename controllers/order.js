import Orders from '../models/Order.js';
import Artwork from '../models/Artwork.js';
import User from '../models/User.js';

//Create a order
const createOrder = async (req, res) => {
  try{
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

//Get all orders of logged in user 
const getAllOrders = async (req, res) => {
  try{
    const orders = await Order.find({orderedBy: req.user.id})
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

//Get order by id
const getOrder = async (req, res) => {
  try{
    const order = await Order.find({_id: req.params._id, orderedBy: req.user._id})
    res.json({
      success: true,
      data: order
    })
  } catch(e) {
    res.json({
      success: false,
      message: e.message
    })
  }	
}


//Update order details
const updateOrder = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['paymentMode' ]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).json({
          success: false,
          message: "Invalid Updates"
      })
  }

  try{
      const order = await Order.findOneAndUpdate({_id: req.params._id, createdBy: req.user._id}, req.body, {new: true})

      if(!order) {
          return res.status(404).json({
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
const deleteOrder = async (req, res) => {
  try{
    const order = await Order.findOne({_id: req.params.id, orderedBy: req.user.id})

    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }
    order.remove()
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

export {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
}

