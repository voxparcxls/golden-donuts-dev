const express = require('express')
const uuidv4 = require('uuid/v4')
const User = require('../models/User')
const Rewards = require('../models/Rewards')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @api {post} /users/register Creates a new user
 *
 * @apiParam {String} name Users full name.
 * @apiParam {String} email Users email address.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {User} user User info.
 * @apiSuccess {String} token Auth token for user
 * 
 * @apiFailure {String} error Message for authentication failure.
 */
router.post('/users/register', async (req, res) => { 
  try { 
    const userBody = req.body
    userBody.id = uuidv4()
    const user = new User(userBody)
    const rewards = new Rewards({ name: user.name, id: user.id, points: 50 })
    await user.save()
    await rewards.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) { 
    res.status(400).send({error: error.message})
  }
})

/**
 * @api {post} /users/login Authenticate a user
 *
 * @apiParam {String} email Users email address.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {User} user User info.
 * @apiSuccess {String} token Auth token for user
 * 
 * @apiFailure {String} error Message for authentication failure.
 */
router.post('/users/login', async(req, res) => { 
  try { 
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) { 
      return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) { 
    res.status(400).send({error: error.message})
  }
})

/**
 * @api {get} /users/me Get User info
 * 
 * @apiAuth Requires valid auth header
 *
 * @apiSuccess {User} user User info.
 * 
 * @apiFailure {String} error Message for account failure.
 */
router.get('/users/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

/**
 * @api {put} /users/me Update a user
 *
 * @apiAuth Requires valid auth header
 *
 * @apiSuccess {User} user User info.
 * 
 * @apiFailure {String} error Message for update failure.
 */
router.put('/users/me', auth, async(req, res) => { 
  try { 
    const user = await User.findOne({ id : req.user.id })
    if (!user) throw new Error('No user found')

    if (req.body.password) user.password = req.body.password
    if (req.body.name) user.name = req.body.name

    await user.save()
    res.status(201).send(user)
  } catch (error) { 
    res.status(400).send({error: error.message})
  }
})

/**
 * @api {delete} /users/me Delete a user
 *
 * @apiAuth Requires valid auth header
 *
 * @apiSuccess {} 201 response empty body
 * 
 * @apiFailure {String} error Message for delete failure.
 */
router.delete('/users/me', auth, async(req, res) => {
  try { 
    await User.findOneAndDelete({ id: req.user.id })
    await Rewards.findOneAndDelete({ id: req.user.id })
    res.status(201).send({})
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {post} /users/logout Logout a user
 *
 * @apiAuth Requires valid auth header
 *
 * @apiSuccess {} 200 response empty body
 * 
 * @apiFailure {String} error Message for logout failure.
 */
router.post('/users/me/logout', auth, async (req, res) => { 
  // Log user out
  try { 
    req.user.tokens = req.user.tokens.filter((token) => { 
      return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) { 
    res.status(500).send({error: error.message})
  }
})

/**
 * @api {post} /users/logoutall Logout a user
 *
 * @apiAuth Requires valid auth header
 *
 * @apiSuccess {} 200 response empty body
 * 
 * @apiFailure {String} error Message for logout failure.
 */
router.post('/users/me/logoutall', auth, async(req, res) => { 
  // Log user out of all devices
  try { 
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) { 
    res.status(500).send({error: error.message})
  }
})

/**
 * @api {get} /api/users/:id Get User info
 * 
 * @apiAuth Requires valid admin auth header
 *
 * @apiSuccess {User} user User info.
 * 
 * @apiFailure {String} error Message for account failure.
 */
router.get('/api/users/:id', auth, async(req, res) => {
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const user = await User.findOne({ id: req.params.id});
    if (!user) throw new Error('No user found')
    res.send(user)
  } catch (error) { 
    res.status(400).send(error)
  }
})

module.exports = router