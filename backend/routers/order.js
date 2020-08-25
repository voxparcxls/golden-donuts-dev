const express = require('express')
const uuidv4 = require('uuid/v4')
const Order = require('../models/Order')
const Menu = require('../models/Menu')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @api {get} /orders/me Get my orders
 *
 * @apiSuccess Array of orders.
 * 
 * @apiFailure {String} error Message for fetching my orders.
 */
router.get('/orders/me', auth, async (req, res) => { 
  const order = await Order.find({ userid: req.user.id }).sort('-orderdate');
  res.send(order)
})

/**
 * @api {post} /orders Place new order
 *
 * @apiSuccess Order.
 * 
 * @apiFailure {String} error Message for placing order.
 */
router.post('/orders', auth, async (req, res) => { 
  try { 
    const orderBody = req.body
    orderBody.id = uuidv4()
    orderBody.userid = req.user.id

    const menuItem = await Menu.findOne({id: orderBody.menuid})
    if (!menuItem) { 
      throw new Error('Invalid menu item')
    }
    orderBody.amount = menuItem.price

    const orderItem = new Order(orderBody)
    await orderItem.save()
    res.status(201).send(orderItem)
  } catch (error) { 
    console.log(error)
    res.status(400).send(error)
  }
})

/**
 * @api {delete} /orders/id Delete user order
 *
 * @apiSuccess {} Empty object if item deleted successfully.
 * 
 * @apiFailure {String} error Message for deleting user order.
 */
router.delete('/orders/:id', auth, async (req, res) => { 
  try { 
    const order = await Order.findOne({id: req.params.id, userid: req.user.id })
    if (!order) { 
      throw new Error('Order not found')
    }
    await order.delete()
    res.status(201).send({})
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {get} /api/orders Get all orders
 *
 * @apiSuccess Array of orders.
 * 
 * @apiFailure {String} error Message for fetching orders.
 */
router.get('/api/orders', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const order = await Order.find({}).sort('-orderdate');
    res.send(order)
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {put} /api/orders Update order
 *
 * @apiSuccess Order.
 * 
 * @apiFailure {String} error Message for updating order.
 */
router.put('/api/orders/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const orderItem = await Menu.findOneAndUpdate({ id: req.params.id }, req.body, { 
      new: true
    })
    res.status(201).send(orderItem)
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {delete} /api/menu/id Delete a order
 * 
 * @apiSuccess {} Empty object if item deleted successfully.
 * 
 * @apiFailure {String} error Message for deleted item.
 */
router.delete('/api/orders/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    await Order.deleteOne({ id: req.params.id });
    res.status(201).send({})
  } catch (error) { 
    res.status(400).send(error)
  }
})

module.exports = router