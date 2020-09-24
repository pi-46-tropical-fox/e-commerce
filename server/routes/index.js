const router = require("express").Router()
const UserController = require('../controller/UserController')
const ProductController = require("../controller/ProductController")
const CartController = require("../controller/CartController")
const { authentication } = require("../middleware/auth")

router.get("/", (req, res) => {
    res.json({messsage: "MASUK HEROKU"})
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)

router.get('/product', ProductController.read)
router.get('/product/:id', ProductController.getOne)
router.post('/product', ProductController.create)
//When customers add items to cart
router.post('/item/:id', CartController.createOrUpdate)
//When user remove item by one
router.patch('/item/:id', CartController.removeOne)
//Get user's item
router.get('/item', CartController.get)
//Delete items from cart
router.delete('/item/:id', CartController.delete)
//when customer checks out
router.put('/item', CartController.checkout)
router.patch('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.delete)

module.exports = router