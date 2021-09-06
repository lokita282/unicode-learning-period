require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/db')
const morgan = require('morgan')
const passport = require('passport')
const userRouter = require('./routes/user')
const artworkRouter = require('./routes/artwork')
const orderRouter = require('./routes/order')
const port = process.env.PORT || 3000

 db()

app.use(morgan(':method :url :status :response-time ms'))

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/artwork', artworkRouter)
app.use('/api/order', orderRouter)

app.use(passport.initialize())


app.listen(port, () => console.log(`server has started on port ${port}`))
