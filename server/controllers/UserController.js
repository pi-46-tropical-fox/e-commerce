const { User } = require("../models");
const { compare_bcrypt_password } = require("../helpers/bcrypt");
const { generate_jwt_token } = require("../helpers/jwt");

class UserController {
	static async register (req, res) {
		const { username, email, password } = req.body;
		try {
			const new_user = await User.create({ username, email, password });
			return res.status(201).json({
				id: new_user.id,
				username: new_user.username,
				email: new_user.email
			});
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async login (req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ where: { email }});
			if (!user) {
				return res.status(400).json({ message: "The email or password is invalid." });
			}
			const valid_password = compare_bcrypt_password(password, user.password);
			if (!valid_password) {
				return res.status(400).json({ message: "The email or password is invalid." });
			}
			const access_token = generate_jwt_token(user);
			return res.status(200).json({ access_token, username: user.username });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = UserController;
