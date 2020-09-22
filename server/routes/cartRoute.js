const cartRoute = require('express').Router()
const cartController = require('../controllers/CartController');
const {authentication} = require('../middleware/auth');


cartRoute.use(authentication)
cartRoute.get('/paid', cartController.getPaid)
cartRoute.get('/unpaid', cartController.getUnPaid)
cartRoute.post('/', cartController.addCart)
cartRoute.put('/:id', cartController.updateCart)
cartRoute.delete('/:id',cartController.deleteCart)

module.exports = cartRoute
