'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.addColumn("Carts", "grandTotal", { 
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn("Carts", "grandTotal", {}) 
  }
};
