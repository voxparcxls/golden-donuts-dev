const jwt = require('jsonwebtoken')
const User = require('../models/User')

/* 
  Middelware function for REST API
  Used to protect certain routes by verifying Auth header
  Once verified adds user object and token to request
*/
const auth = async(req, res, next) => { 
  try { 
    const authHeader = req.header('Authorization')
    if (!authHeader) {
      throw new Error()
    }
    const token = authHeader.replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ id: data.id, 'tokens.token': token })
    if (!user) { 
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) { 
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}

module.exports = auth