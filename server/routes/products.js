const ProductController = require("../controllers/productController")
const {authentication, adminAuthorization} = require("../middlewares/userAuth")

const router = require("express").Router()

router.get("/", ProductController.getAllProducts)
router.use(authentication)
router.post("/", adminAuthorization, ProductController.addProduct)  
router.put("/:id", adminAuthorization, ProductController.editProduct)

router.delete("/:id",adminAuthorization, ProductController.deleteProduct)


module.exports = router