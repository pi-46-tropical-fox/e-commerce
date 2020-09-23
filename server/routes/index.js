const router = require("express").Router();
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const CartController = require('../controllers/CartController')
const { authentication, authorization, authorizationCust } = require("../middlewares/auth");

//REGISTER
router.post('/register', UserController.register)

//LOGIN
router.post("/login", UserController.login);

//GET PRODUCTS
router.get("/products", ProductController.show);

//CART ROUTES
router.get('/carts', authentication, CartController.showCart)

router.post('/carts/:id', authentication, CartController.addCart)

router.delete('/carts/:id', authentication, authorizationCust, CartController.deleteCart)

router.post('/checkout', authentication, CartController.checkout)



// ADMIN
//ADD PRODUCTS
router.post("/products", authentication, authorization, ProductController.add);

//EDIT PRODUCTS
router.get("/products/:id", authentication, authorization, ProductController.find);
router.put("/products/:id", authentication, authorization, ProductController.edit);

//DELETE PRODUCTS
router.delete("/products/:id", authentication, authorization, ProductController.delete);

module.exports = router;
