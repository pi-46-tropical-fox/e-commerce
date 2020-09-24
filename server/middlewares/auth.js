const { verifyToken } = require('../helpers/jwt');
const { User, Cart, Product } = require('../models');

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;

	try {
		const userData = verifyToken(access_token);
		const user = await User.findByPk(userData.id);
		if (user) {
			req.userData = userData;
			next();
		} else {
			throw { name: 'notAuthenticated' };
		}
	} catch (error) {
		next(error);
	}
};

const authorizationByRoleAdmin = async (req, res, next) => {
	const { role } = req.userData;

	if (role === 'admin') {
		next();
	} else {
		next({ name: 'notAuthorizedUser' });
	}
};

const authorizationCartByUserId = async (req, res, next) => {
	const { id } = req.userData;

	try {
		const cart = await Cart.findOne({
			where: {
				id: req.params.id,
				UserId: id,
			},
			include: ['Product'],
		});

		if (!cart) {
			throw { name: 'notFoundCart' };
		} else if (cart && cart.UserId === id) {
			req.cart = cart;
			next();
		} else {
			throw { name: 'notAuthorizedUser' };
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { authentication, authorizationByRoleAdmin, authorizationCartByUserId };
