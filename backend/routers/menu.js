const express = require('express')
const uuidv4 = require('uuid/v4')
const Menu = require('../models/Menu')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @api {get} /api/menu Get all menu items
 *
 * @apiSuccess Array of menu items.
 * 
 * @apiFailure {String} error Message for fetching menu.
 */
router.get('/api/menu', async (req, res) => { 
  const menu = await Menu.find({})
  res.send(menu)
})

router.get('/api/menu/:id', auth, async (req, res) => { 
  const menu = await Menu.find({id: req.params.id})
  res.send(menu)
})

/**
 * @api {post} /api/menu Add new menu item
 * 
 * @apiAuth Restricted to only admin use
 * 
 * @apiParam {String} name Menu item name.
 * @apiParam {Number} price Menu item price.
 * @apiParam {String} description Menu item description.
 * @apiParam {String} imageURL Menu item image.
 *
 * @apiSuccess {MenuItem} Menu item that was added.
 * 
 * @apiFailure {String} error Message for adding item.
 */
router.post('/api/menu', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const menuBody = req.body
    menuBody.id = uuidv4()
    const menuItem = new Menu(menuBody)
    await menuItem.save()
    res.status(201).send(menuItem)
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {put} /api/menu/id Update a menu item
 * 
 * @apiAuth Restricted to only admin use
 * 
 * @apiParam {String Optional} name Menu item name.
 * @apiParam {String Optional} price Menu item price.
 * @apiParam {String Optional} description Menu item description.
 * @apiParam {String Optional} imageURL Menu item image.
 *
 * @apiSuccess {MenuItem} Menu item that was updated.
 * 
 * @apiFailure {String} error Message for updating item.
 */
router.put('/api/menu/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    const menuItem = await Menu.findOneAndUpdate({ id: req.params.id }, req.body, { 
      new: true
    })
    res.status(201).send(menuItem)
  } catch (error) { 
    res.status(400).send(error)
  }
})

/**
 * @api {delete} /api/menu/id Delete a menu item
 * 
 * @apiAuth Restricted to only admin use
 *
 * @apiSuccess {} Empty object if item deleted successfully.
 * 
 * @apiFailure {String} error Message for deleted item.
 */
router.delete('/api/menu/:id', auth, async (req, res) => { 
  try { 
    if(!req.user.isAdmin) { 
      return res.status(401).send({error: 'Not authorized to access this resource'})
    }
    await Menu.deleteOne({ id: req.params.id });
    res.status(201).send({})
  } catch (error) { 
    res.status(400).send(error)
  }
})

module.exports = router