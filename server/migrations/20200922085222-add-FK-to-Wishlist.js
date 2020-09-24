'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Wishlists', "UserId", {
        type: Sequelize.INTEGER,
        reference: {
          model: "User",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }),
      queryInterface.addColumn('Wishlists', "ProductId", {
        type: Sequelize.INTEGER,
        reference: {
          model: "Product",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Wishlists', "UserId"),
      queryInterface.removeColumn('Wishlists', "ProductId")
    ])
  }
};
