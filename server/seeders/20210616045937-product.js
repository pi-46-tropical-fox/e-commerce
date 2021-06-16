'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        "name": "Hexohm V3 Anodized",
        "image_url": "https://cf.shopee.co.id/file/0002ab7b00f5c10c6112b31d63b2c713",
        "price": 3200000,
        "stock": 2342,
        "createdAt": "2020-09-22T09:29:29.585Z",
        "updatedAt": "2020-09-23T11:52:28.462Z"
      },
      {
        "name": "Macbook Pro 2020",
        "image_url": "https://i.ebayimg.com/images/g/zRUAAOSwiJRePBEj/s-l640.jpg",
        "price": 25890000,
        "stock": 1265,
        "createdAt": "2020-09-22T09:29:50.774Z",
        "updatedAt": "2020-09-23T11:55:34.725Z"
      },
      {
        "name": "Apple Magic Mouse",
        "image_url": "https://i.ebayimg.com/images/g/8FUAAOSwowZfGAe7/s-l500.jpg",
        "price": 980000,
        "stock": 78231,
        "createdAt": "2020-09-22T09:30:02.630Z",
        "updatedAt": "2020-09-23T11:57:00.847Z"
      },
      {
        "name": "Apple AirPods Pro - White",
        "image_url": "https://i.ebayimg.com/images/g/iEoAAOSw9xJeVTdf/s-l300.jpg",
        "price": 3400000,
        "stock": 78231,
        "createdAt": "2020-09-23T11:45:59.154Z",
        "updatedAt": "2020-09-23T11:58:08.197Z"
      },
      {
        "name": "Tas Anti Maling",
        "image_url": "https://i.imgur.com/Dap4SDh.png",
        "price": 350000,
        "stock": 492793,
        "createdAt": "2020-09-23T12:03:10.931Z",
        "updatedAt": "2020-09-23T12:03:10.931Z"
      },
      {
        "name": "Baju Tidur",
        "image_url": "https://i.imgur.com/wsm1aZZ.png",
        "price": 35000,
        "stock": 12312,
        "createdAt": "2020-09-23T12:03:57.565Z",
        "updatedAt": "2020-09-23T12:03:57.565Z"
      },
      {
        "name": "Hoodie Grey",
        "image_url": "https://i.imgur.com/dYQ0wB4.png",
        "price": 175000,
        "stock": 98453,
        "createdAt": "2020-09-23T12:04:36.104Z",
        "updatedAt": "2020-09-23T12:04:36.104Z"
      },
      {

        "name": "Camera with Gorilla Pod",
        "image_url": "https://i.imgur.com/ze6wLVw.png",
        "price": 2750000,
        "stock": 34252,
        "createdAt": "2020-09-23T12:05:50.618Z",
        "updatedAt": "2020-09-23T12:05:50.618Z"
      },
      {

        "name": "Kacamata Gaul",
        "image_url": "https://i.imgur.com/jC0aW4W.png",
        "price": 2750000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:36:08.651Z",
        "updatedAt": "2020-09-23T13:36:08.651Z"
      },
      {

        "name": "Ukulele Masa Kini",
        "image_url": "https://i.imgur.com/84TT5dy.png",
        "price": 345000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:36:43.493Z",
        "updatedAt": "2020-09-23T13:36:43.493Z"
      },
      {

        "name": "Rak Bunga",
        "image_url": "https://i.imgur.com/uBHXoTC.png",
        "price": 125000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:40:59.262Z",
        "updatedAt": "2020-09-23T13:40:59.262Z"
      },
      {

        "name": "Beras Pilihan",
        "image_url": "https://i.imgur.com/XuKYmzR.png",
        "price": 10000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:42:25.443Z",
        "updatedAt": "2020-09-23T13:42:25.443Z"
      },
      {

        "name": "Kipas Angin",
        "image_url": "https://i.imgur.com/Mwfkov1.png",
        "price": 178000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:42:51.856Z",
        "updatedAt": "2020-09-23T13:42:51.856Z"
      },
      {

        "name": "Jam Tangan",
        "image_url": "https://i.imgur.com/4zkwRNC.png",
        "price": 350000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:43:13.367Z",
        "updatedAt": "2020-09-23T13:43:13.367Z"
      },
      {

        "name": "Sepatu",
        "image_url": "https://i.imgur.com/UaxGh89.png",
        "price": 350000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:43:29.503Z",
        "updatedAt": "2020-09-23T13:43:29.503Z"
      },
      {

        "name": "Masker",
        "image_url": "https://i.imgur.com/QelCjER.jpg",
        "price": 23000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:54:13.113Z",
        "updatedAt": "2020-09-23T13:54:13.113Z"
      },
      {

        "name": "Sepatu Converse",
        "image_url": "https://i.imgur.com/bjclt8v.png",
        "price": 700000,
        "stock": 34252,
        "createdAt": "2020-09-23T13:59:53.972Z",
        "updatedAt": "2020-09-23T13:59:53.972Z"
      },
      {

        "name": "Seragam Hogwarts",
        "image_url": "https://i.imgur.com/ZqMYVgG.jpg",
        "price": 35000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:00:54.209Z",
        "updatedAt": "2020-09-23T14:00:54.209Z"
      },
      {

        "name": "Long Dress",
        "image_url": "https://i.imgur.com/YabGl2d.jpg",
        "price": 35000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:01:10.240Z",
        "updatedAt": "2020-09-23T14:01:10.240Z"
      },
      {

        "name": "T-shirt Long",
        "image_url": "https://i.imgur.com/IbxOmNp.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:01:43.745Z",
        "updatedAt": "2020-09-23T14:01:43.745Z"
      },
      {

        "name": "Sandal Lucu",
        "image_url": "https://i.imgur.com/LNT49X5.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:02:16.375Z",
        "updatedAt": "2020-09-23T14:02:16.375Z"
      },
      {

        "name": "Sepatu Merah",
        "image_url": "https://i.imgur.com/oBorWwY.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:02:52.092Z",
        "updatedAt": "2020-09-23T14:02:52.092Z"
      },
      {

        "name": "Crop Tee",
        "image_url": "https://i.imgur.com/SiuXDUq.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:03:30.636Z",
        "updatedAt": "2020-09-23T14:03:30.636Z"
      },
      {

        "name": "Kemeja Pria",
        "image_url": "https://i.imgur.com/bz5C0Ja.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:03:50.538Z",
        "updatedAt": "2020-09-23T14:03:50.538Z"
      },
      {

        "name": "Crop Tee Lucu",
        "image_url": "https://i.imgur.com/xYeljUQ.jpg",
        "price": 75000,
        "stock": 34252,
        "createdAt": "2020-09-23T14:04:14.056Z",
        "updatedAt": "2020-09-23T14:04:14.056Z"
      }
    ])
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
