const mongoose = require('mongoose')

const rewardsSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  id: { 
    type: String,
    required: true,
    unique: true
  },
  points: { 
    type: Number,
    required: true,
    default: 0
  },
  history: [{ 
    total: { 
      type: Number,
      required: true,
    },
    date: { 
      type: Date,
      required: true,
    },
    points: { 
      type: Number,
      required: true,
    },
  }]
})

const Rewards = mongoose.model('Rewards', rewardsSchema)

module.exports = Rewards