const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const userRouter = require('./routers/user')
const menuRouter = require('./routers/menu')
const orderRouter = require('./routers/order')
const rewardsRouter = require('./routers/rewards')

// Loads enviorment variables
require('dotenv').config()

const port = process.env.API_PORT
require('./db/connection')
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(userRouter)
app.use(menuRouter)
app.use(orderRouter)
app.use(rewardsRouter)

app.listen(port, () => { 
  console.log(`listening on ${port}`)
})