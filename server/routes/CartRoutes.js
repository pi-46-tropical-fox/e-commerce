const CartController = require('../controllers/CartController');
const { authentication, authorizationCartByUserId } = require('../middlewares/auth');

const routes = require('express').Router();

routes.get('/carts', authentication, CartController.list);

routes.get('/carts/:id', authentication, authorizationCartByUserId, CartController.byId);

routes.post('/carts/:productId', authentication, CartController.addToCart);

routes.put('/carts/:id', authentication, authorizationCartByUserId, CartController.update);

routes.delete('/carts/:id', authentication, authorizationCartByUserId, CartController.delete);

module.exports = routes;
