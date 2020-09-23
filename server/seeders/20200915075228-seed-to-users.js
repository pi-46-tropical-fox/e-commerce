'use strict';
const passwordHash = require("../helpers/passwordHash")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      let adminData = {
        email: "admin@mail.com",
        password: passwordHash("1234"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await queryInterface.bulkInsert("Users", [adminData], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete("Users", null, {})

  }
};
