'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
         name: 'T Shirt Women Mickey Mouse',
         img_url: "https://boobeeshop.com/wp-content/uploads/2019/11/redirect-1556.jpg",
         price: 120000,
         stock: 73,
         UserId: 1,
         category: 'Women',
         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        name: 'Beach Cotton T Shirt',
        img_url: "https://www.cruisefashion.com/images/products/65360601_l.jpg",
        price: 120000,
        stock: 73,
        UserId: 1,
        category: 'Women',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Light Blue Wool T Shirt',
        img_url: "https://mp-media.reebonz.com/images/p-85/reebonz-gucci-629456xkbhq4692-womens-light-blue-wool-t-shirt-gucci-1-85e16d24-812d-4c62-a990-af87da471d54.jpg",
        price: 120000,
        stock: 73,
        UserId: 1,
        category: 'Women',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
       name: 'Snake Women T Shirt',
       img_url: "https://diystees.com/wp-content/uploads/2018/06/image-7505.jpeg",
       price: 120000,
       stock: 73,
       UserId: 1,
       category: 'Women',
       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Pig Women T Shirt',
      img_url: "https://diystees.com/wp-content/uploads/2018/06/image-7305.jpeg",
      price: 120000,
      stock: 73,
      UserId: 1,
      category: 'Women',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
     name: 'Polo Shirt Mens Brown',
     img_url: "https://images-na.ssl-images-amazon.com/images/I/71YfXoP2PeL._AC_UL1000_.jpg",
     price: 120000,
     stock: 73,
     UserId: 1,
     category: 'Men',
     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    name: 'Tiger With Youth Long Sleeve',
    img_url: "https://d1sf7mppjz6qwb.cloudfront.net/660ef7/0f142a/1556244437_gildan-6.1oz-long-sleeve-front/30.17.44.46.1.0.99.100/eb89e03d5d177b1ee643c7e99ed4edb7/2019/08/04/thumbnail/sig546964_z4HQLq/64ej-gucci-logo-with-tiger-youth-long-sleeve-navy50-front-480px.png",
    price: 120000,
    stock: 73,
    UserId: 1,
    category: 'Men',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'T Shirt Harvey Nicolas',
    img_url: "https://m.hng.io/catalog/product/7/8/780308_white_1.jpg",
    price: 120000,
    stock: 73,
    UserId: 1,
    category: 'Men',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'What Are We Go',
    img_url: "https://tamybeauty.com/wp-content/uploads/2019/05/IMG_3875.png",
    price: 120000,
    stock: 73,
    UserId: 1,
    category: 'Men',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
      ], {});
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
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
