const { Cart, Product } = require('../models');

class CartController {
	static async list(req, res, next) {
		try {
			const carts = await Cart.findAll({
				where: {
					UserId: req.userData.id,
				},
				include: ['Product'],
			});

			return res.status(200).json(carts);
		} catch (error) {
			next(error);
		}
	}

	static async byId(req, res, next) {
		try {
			return res.status(200).json(req.cart);
		} catch (error) {
			next(error);
		}
	}

	static async addToCart(req, res, next) {
		try {
			const product = await Product.findOne({
				where: {
					id: req.params.productId,
				},
			});

			if (product) {
				const cart = await Cart.findOrCreate({
					where: {
						ProductId: req.params.productId,
					},
					// create if not exist
					defaults: {
						ProductId: req.params.productId,
						UserId: req.userData.id,
						quantity: 1,
					},
				});

				const isNotOverTheStock = () => Number(cart[0].quantity) < Number(product.stock);

				// if cart with given product id exist dan quantity not over the stock, return it with quantity++
				if (cart[1] === false && isNotOverTheStock()) {
					const updatedCart = await Cart.update(
						{
							quantity: cart[0].quantity + 1,
						},
						{
							where: {
								id: cart[0].id,
							},
							returning: true,
						}
					);

					if (updatedCart[0]) {
						return res.status(200).json(updatedCart[1][0]);
					} else {
						throw { name: 'notFoundCart' };
					}
				} else if (!isNotOverTheStock()) {
					throw { name: 'isOverTheStock' };
				} else {
					// if cart with given product id not exist, return created cart with quantity = 1
					return res.status(201).json(cart[0]);
				}
			} else {
				throw { name: 'notFoundProduct' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		const { quantity } = req.body;
		try {
			const product = await Product.findByPk(req.cart.ProductId);

			if (quantity <= product.stock) {
				const cart = await Cart.update(
					{ quantity },
					{
						where: {
							id: req.params.id,
						},
						returning: true,
					}
				);

				if (cart[0]) {
					return res.status(200).json(cart[1][0]);
				} else {
					throw err;
				}
			} else {
				throw { name: 'isOverTheStock' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const cart = await Cart.destroy({ where: { id: req.params.id } });

			return res.status(200).json({ message: 'Cart deleted' });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CartController;
