const { User, Cart } = require("../models");

const authorization = async (req, res, next) => {
	const UserId = req.user.id;
	try {
		const user = await User.findByPk(UserId);
		if (user && user.role === "admin") {
			return next();
		}
		return res.status(403).json({ message: "The user is not authorized." });
	} catch (err) {
		return next(err);
	}
};

const customer_authorization = async (req, res, next) => {
	const CartId = +req.params.CartId;
	try {
		const cart = await Cart.findByPk(CartId);
		if (cart && cart.UserId === req.user.id) {
			return next();
		}
		return res.status(403).json({ message: "The user is not authorized." });
	} catch(err) {
		return next(err);
	}
};

module.exports = { authorization, customer_authorization };
