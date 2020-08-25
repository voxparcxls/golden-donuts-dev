const express = require('express')
const Rewards = require('../models/Rewards')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/rewards/me', auth, async (req, res) => { 
  try { 
    const rewards = await Rewards.findOne({ id: req.user.id })
    if (!rewards) throw new Error('No rewards found')
    res.status(200).send(rewards)
  } catch (error) { 
    res.status(400).send(error)
  }
})

router.get('/api/rewards/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const rewards = await Rewards.findOne({ id: req.params.id })
    res.status(200).send(rewards)
  } catch (error) { 
    res.status(400).send(error)
  }
})

router.post('/api/rewards/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const rewards = await Rewards.findOne({ id: req.params.id })
    rewards.points += req.body.points
    await rewards.save()
    res.status(201).send(rewards)
  } catch (error) { 
    res.status(400).send(error)
  }
})

module.exports = router