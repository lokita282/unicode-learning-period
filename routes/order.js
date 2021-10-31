import  express from 'express'
import  auth from '../middleware/auth.js'
import  isAdmin from '../middleware/isAdmin.js'
import  {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
} from '../controllers/order.js'

const router = new express.Router()


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

export default router