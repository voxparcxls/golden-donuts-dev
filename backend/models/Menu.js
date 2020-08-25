const mongoose = require('mongoose')
const validator = require('validator')

const menuSchema = mongoose.Schema({
  id: { 
    type: String,
    required: true,
    unique: true
  },
  name: { 
    type: String,
    required: true,
    trim: true
  },
  description: { 
    type: String,
    required: true,
    trim: true
  },
  price: { 
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true,
    validate: value => { 
      if (!validator.isURL(value)) { 
        throw new Error('Invalid image URL')
      }
    }
  },
  seasonal: {
    type: String,
    required: true
  },
  hide: {
    type: Boolean,
    default: false,
    required: false
  }
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu