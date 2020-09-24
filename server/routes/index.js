const router = require("express").Router();
const users_routes = require("./users_routes");
const products_routes = require("./products_routes");
const carts_routes = require("./carts_routes");

router.use("/users", users_routes);
router.use("/products", products_routes);
router.use("/carts", carts_routes);

module.exports = router;
