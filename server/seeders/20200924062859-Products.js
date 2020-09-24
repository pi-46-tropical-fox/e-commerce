"use strict";

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
    await queryInterface.bulkInsert("Products", [
      {
        name: "Jordan 1",
        image_url: 'https://www.hypeclothinga.com/wp-content/uploads/2020/03/Nike-Air-Jordan-1-Retro-High-Chicago-2015-OG-Limited-Edition-Hype-Clothinga-.png',
        price: 5000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kobe IV Protro",
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScuMK9Aqo4wj5_3ArE_6to9Py7Jnpla-v4KQ&usqp=CAU',
        price: 4000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kobe 1 Protro",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61dJLg68%2BVL._UL1000_.jpg',
        price: 30000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kobe V Bruce Lee",
        image_url: 'https://i.pinimg.com/originals/99/69/94/99699432d08280a461271a45eaa22380.jpg',
        price: 5000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kobe V Protro Undeafeted",
        image_url: 'https://images.solecollector.com/complex/images/c_crop,h_1125,w_2000,x_0,y_688/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_680/fglsednbwwapdgtozlxq/undefeated-nike-kobe-5-protro-what-if-pack-db5551-900-pair',
        price: 6000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kove V Protro Mamba Week",
        image_url: 'https://kenlu.net/wp-content/uploads/2020/08/nike-taiwan-kobe-v-protro-mamba-week-8.jpg',
        price: 7000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kobe XI Mamba Day",
        image_url: 'https://sneakernews.com/wp-content/uploads/2016/04/nike-kobe-11-mamba-day-id-release-info-1.jpg?w=620&h=435&crop=1',
        price: 50000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jordan XXXVIII",
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQofAJ7ylm9yhrgQF_yHr4zml-Sab_K7AyKyw&usqp=CAU',
        price: 50000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nike Jordan 1 Low ",
        image_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//97/MTA-3359194/nike_nike-air-jordan-1-low-sepatu-sneakers-unisex---black--553558-116-_full06.jpg',
        price: 50000000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products', null, {});
     
  },
};
