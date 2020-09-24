'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2
const password = "12345"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
         email: 'admin@mail.com',
         password: bcrypt.hashSync(password, saltRounds),
         status: 'Admin',
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
