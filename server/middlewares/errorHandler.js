const errorHandler = (err, req, res, next) => {
	let statusCode = 500;
	let errors = [];
	switch (err.name) {
		case 'SequelizeValidationError':
		case 'SequelizeUniqueConstraintError':
			statusCode = 400;
			err.errors.forEach(el => {
				errors.push({
					name: el.validatorKey,
					message: el.message,
				});
			});
			break;
		case 'invalidLogin':
			statusCode = 400;
			errors.push({
				name: err.name,
				message: 'Invalid email or password!',
			});
			break;
		case 'notAuthorizedUser':
			statusCode = 403;
			errors.push({
				name: err.name,
				message: 'User not authorized perform this action',
			});
			break;
		case 'notAuthenticated':
			statusCode = 401;
			errors.push({
				name: err.name,
				message: 'User not authenticated',
			});
			break;
		case 'notFoundProduct':
			statusCode = 404;
			errors.push({
				name: 'notFoundProduct',
				message: 'Error product not found',
			});
			break;
		case 'notFoundCategory':
			statusCode = 404;
			errors.push({
				name: 'notFoundCategory',
				message: 'Error category not found',
			});
			break;
		case 'notFoundCart':
			statusCode = 404;
			errors.push({
				name: 'notFoundCart',
				message: 'Error cart not found',
			});
			break;
		case 'isOverTheStock':
			statusCode = 409;
			errors.push({
				name: 'isOverTheStock',
				message: `Product's quantity in cart cannot exceed the product's stock`,
			});
			break;

		default:
			statusCode = 500;
			errors.push({
				name: 'InternalServerError',
				message: 'Internal server error',
			});
			break;
	}

	return res.status(statusCode).json({ errors });
};

module.exports = errorHandler;
