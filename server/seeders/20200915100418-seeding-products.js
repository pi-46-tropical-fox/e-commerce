'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [{
      name: 'Seiko SKX007',
      gender: 'Men',
      category: 'Dive Watch',
      diameter: '43mm',
      movement: 'Automatic',
      description: 'Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX007 is one of the most iconic and respected piece from the Seiko divers lineup',
      image: 'https://cdn.shopify.com/s/files/1/0022/9792/1591/files/SS221820B020_Seiko-SKX007-MT_1400x.jpg?v=1562911459',
      stock: 12,
      price: 3500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seiko SKX009',
      gender: 'Men',
      category: 'Dive Watch',
      diameter: '43mm',
      movement: 'Automatic',
      description: 'Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX009 is one of the most iconic and respected piece from the Seiko divers lineup',
      image: 'https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066',
      stock: 8,
      price: 3500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seiko SZSC005',
      gender: 'Men',
      category: 'Dive Watch',
      diameter: '44mm',
      movement: 'Automatic',
      description: 'Prospex Jade Monster Jade Dial Stainless Steel Automatic Diver Scuba 200M',
      image: 'https://i.pinimg.com/originals/9b/32/8c/9b328c4221f79720b0f5455d5f4a312c.jpg',
      stock: 3,
      price: 7200000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Citizen BN0151-09L Promaster Professional Diver',
      gender: 'Men',
      category: 'Dive Watch',
      diameter: '48mm',
      movement: 'Eco Drive Solar-powered',
      description: "Round watch featuring unidirectional bezel and blue dial with date window at 4 o'clock and luminous hands/hour markers",
      image: 'https://i.pinimg.com/originals/78/cb/e7/78cbe7c8e18b232103acb595869b1da7.jpg',
      stock: 15,
      price: 3000000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seiko SBDN-01X Titanium',
      gender: 'Women',
      category: 'Dive Watch',
      diameter: '38mm',
      movement: 'Solar-powered',
      description: "Seiko’s new titanium Solar divers are matching pairs offered in two sizes—the SBDJ range is 44.1mm x 52.6mm x 12.4mm (marketed to men) and the SBDN range is 38.8mm x 46.5mm x 11.2mm (marketed to women).",
      image: 'https://cdn11.bigcommerce.com/s-e31c8/images/stencil/500x659/products/1113/10988/Prospex_Air_Diver_Solar_SBDN017__46814.1466786974.1280.1280__89925.1469391394.png?c=2',
      stock: 10,
      price: 7800000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Frederique Constant FC303S5B6',
      gender: 'Men',
      category: 'Dress Watch',
      diameter: '39mm',
      movement: 'Automatic',
      description: 'The FC303S5B6 pays homage to the classic Patek Philippe Calatrava dress watch and that’s very apparent in its elegant design. So it’s perfect for an understated dress watch on just about any sized wrist.',
      image: 'https://cdn.watchreviewblog.com/wp-content/uploads/2018/04/Frederique-Constant-FC303S5B6.jpg',
      stock: 12,
      price: 10500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tissot Heritage 1948',
      gender: 'Men',
      category: 'Dress Watch',
      diameter: '39mm',
      movement: 'Automatic',
      description: "It's a vintage-inspired automatic chronograph measuring in under 40mm with a solid movement inside.",
      image: 'https://www.heuermart.com/wp-content/uploads/2017/11/Tissot-Heritage-1948-aBlogtoWatch-01.jpg',
      stock: 2,
      price: 17500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seiko Solar SUP880',
      gender: 'Men',
      category: 'Dress Watch',
      diameter: '32mm',
      movement: 'Automatic',
      description: 'The “Tanko” nickname comes from the obvious homage to the iconic Cartier Tank.',
      image: 'https://cf.shopee.com.my/file/828c13545f8855885c6d7eeef9b65553',
      stock: 3,
      price: 2100000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Longines DolceVita 20mm Gold and Steel',
      gender: 'Women',
      category: 'Dress Watch',
      diameter: '20mm',
      movement: 'Quartz',
      description: "The Longines DolceVita Collection watch features a 20mm rectangular case in stainless steel and 18k gold, sapphire crystal, bracelet and quartz movement.",
      image: 'https://www.prestigetime.com/preowned/images/watches/2020/07/101496/Longines_-L52555797_48351_01.jpg',
      stock: 1,
      price: 19500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'ORIENT RA-KA0004L00B SUN AND MOON',
      gender: 'Women',
      category: 'Dress Watch',
      diameter: '34mm',
      movement: 'Solar-powered',
      description: "Blending classic design with modern essence, this new ORIENT 34.8mm classic quartz watch delivers several notable features showcasing superior watchmaking.",
      image: 'https://cdn2.jomashop.com/media/catalog/product/o/r/orient-sun-and-moon-blue-dial-ladies-watch-ra-ka0004l10b.jpg',
      stock: 10,
      price: 2800000,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null,{})
  }
};
