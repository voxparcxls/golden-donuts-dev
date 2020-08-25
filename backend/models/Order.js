const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = mongoose.Schema({
  id: { 
    type: String,
    required: true,
    unique: true
  },
  menuid: { 
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userid: { 
    type: String,
    required: true,
  },
  status: { 
    type: String,
    required: true,
    default: 'pending'
  },
  orderdate:{
    type: Date,
    default: Date.now
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order