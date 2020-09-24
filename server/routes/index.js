const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CartController = require('../controllers/CartController');
const { authentication, authorization } = require('../middlewares/auth');


router.post('/login', UserController.login)
router.post('/register', UserController.register)


router.get('/products', authentication, ProductController.getProduct);
router.post('/products', authentication, authorization, ProductController.createProduct);
router.get('/products/:id', authentication, ProductController.getProductById);
router.put('/products/:id', authentication, authorization, ProductController.updateProduct);
router.delete('/products/:id', authentication, authorization, ProductController.deleteProduct);

router.get('/carts', authentication, CartController.getCarts);
router.post('/carts/:ProductId', authentication, CartController.addCart);
router.put('/carts/:id', authentication, CartController.editQuantity);
router.delete('/carts/:id', authentication, CartController.deleteCart);

module.exports = router