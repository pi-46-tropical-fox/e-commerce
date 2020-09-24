
const router = require("express").Router()
const users = require("./users")
const product = require("./products")
const categories = require('./categories')
const carts = require('./carts')
const {authentication, adminAuthorization} = require("../middlewares/userAuth")

router.get("/", function(req, res){
    res.send("E-Commerce API")
})

router.use("/users", users)



router.use('/categories', categories)
router.use("/products", product)
router.use('/carts', carts)


module.exports= router