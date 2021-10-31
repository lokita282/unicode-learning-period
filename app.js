import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import db from'./config/db.js'
import morgan from'morgan'
import passport from'passport'

import userRouter from'./routes/user.js'
import artworkRouter from'./routes/artwork.js'
import orderRouter from'./routes/order.js'

const port = process.env.PORT || 3000

await db()

app.use(morgan(':method :url :status :response-time ms'))

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/artwork', artworkRouter)
app.use('/api/order', orderRouter)

app.use(passport.initialize())


const server = app.listen(port, () => console.log(`server has started on port ${port}`))

export default server