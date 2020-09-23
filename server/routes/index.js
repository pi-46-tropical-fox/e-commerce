const routes = require('express').Router();
const UserRoutes = require('../routes/UserRoutes');
const ProductRoutes = require('../routes/ProductRoutes');
const CategoryRoutes = require('../routes/CategoryRoutes');
const CartRoutes = require('../routes/CartRoutes');

routes.use(UserRoutes);
routes.use(ProductRoutes);
routes.use(CategoryRoutes);
routes.use(CartRoutes);

module.exports = routes;
