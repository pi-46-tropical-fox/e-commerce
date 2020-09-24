const { Cart } = require("../models");

class CartController {
	static async create(req, res) {
		const { quantity, status, UserId, ProductId } = req.body;
		try {
			const new_cart = await Cart.create({ quantity, status, UserId, ProductId });
			return res.status(201).json(new_cart);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async read(req, res) {
		try {
			const all_carts = await Cart.findAll();
			return res.status(200).json(all_carts);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async upadte(req, res) {
		const CartId = +req.params.CartId;
		const { quantity, status, UserId, ProductId } = req.body;
		try {
			const updated_cart = await Cart.update({ quantity, status, UserId, ProductId }, {
				where: {
					id: CartId
				},
				returning: true
			});
			return res.status(200).json(updated_cart[1][0]);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async delete(req, res) {
		const CartId = +req.params.CartId;
		try {
			const deleted_cart = await Cart.findByPk(CartId);
			const result = await Cart.destroy({
				where: {
					id: CartId
				}
			});
			return res.status(200).json(deleted_cart);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = CartController;
