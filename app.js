require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const userRouter = require('./routes/user')
const artworkRouter = require('./routes/artwork')
const orderRouter = require('./routes/order')
const port = process.env.PORT

app.use(morgan(':method :url :status :response-time ms'))

mongoose.connect( process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/artwork', artworkRouter)
app.use('/api/order', orderRouter)


app.listen(port, () => console.log('server has started'))
