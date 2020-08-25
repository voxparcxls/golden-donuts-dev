const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
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
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => { 
      if (!validator.isEmail(value)) { 
        throw new Error('Invalid Email address')
      }
    }
  },
  password: { 
    type: String,
    required: true,
    minLength: 7
  },
  isAdmin: { 
    type: Boolean,
    required: true,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.pre('save', async function (next) { 
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) { 
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() { 
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({id: user.id}, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => { 
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) { 
    throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) { 
    throw new Error('Invalid login credentials')
  }
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User