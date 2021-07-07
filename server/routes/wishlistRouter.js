const wishlistRouter = require("express").Router();
const { authentication, authorizeWishlist } = require("../middlewares/auth.js");
const WishlistController = require("../controllers/WishlistController.js");

wishlistRouter.post("/:productId", authentication, WishlistController.addWishlist);

wishlistRouter.get("/", authentication, WishlistController.showAllWishlist);

wishlistRouter.get("/:id", authentication, authorizeWishlist, WishlistController.getWishlistById);

// wishlistRouter.put("/:id", authentication, authorizeWishlist, WishlistController.updateWishlist);

wishlistRouter.delete("/:id", authentication, authorizeWishlist, WishlistController.deleteWishlist);

module.exports = wishlistRouter;