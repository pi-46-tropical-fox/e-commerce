'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cart.belongsTo(models.User);
			Cart.belongsTo(models.Product);
		}
	}
	Cart.init(
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER,
			},
			ProductId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Product id cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Product id cannot null',
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'User id cannot empty',
					},
					notNull: {
						args: true,
						msg: 'User id cannot null',
					},
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Quantity cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Quantity cannot null',
					},
					isInteger(val) {
						if (val < 0 || typeof val !== 'number') {
							throw new Error('Quantity must be positive numbers with no leading zeroes');
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Cart',
		}
	);
	return Cart;
};
