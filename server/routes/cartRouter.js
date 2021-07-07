const CartController = require("../controllers/CartController");
const cartRouter = require("express").Router();
const { authentication, authorizeCart } = require("../middlewares/auth.js");

cartRouter.post("/checkoutall", authentication, CartController.checkoutAll)

cartRouter.post("/checkout/:id", authentication, authorizeCart, CartController.checkout);

cartRouter.get("/", authentication, CartController.showAllCarts);

cartRouter.post("/:productId", authentication, CartController.addCart);

cartRouter.get("/:id", authentication, authorizeCart, CartController.getCartById);

cartRouter.put("/:id", authentication, authorizeCart, CartController.updateCart);

cartRouter.delete("/:id", authentication, authorizeCart,  CartController.deleteCart);

module.exports = cartRouter;