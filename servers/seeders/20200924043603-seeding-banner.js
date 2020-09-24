'use strict';

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
   await queryInterface.bulkInsert("Banners", [
     {
        title: "Iklan Jamu",
        status: true,
        image_url: "/assets/iklan-1.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        title: "Iklan Minuman",
        status: true,
        image_url: "/assets/iklan-2.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        title: "Iklan Makanan",
        status: true,
        image_url: "/assets/iklan-3.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
     }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Banners", null, {})
  }
};
