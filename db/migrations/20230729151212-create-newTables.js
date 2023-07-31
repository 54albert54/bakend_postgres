'use strict';

const { CATEGORY_TABLE,CategorySchema }= require('../models/category.models');
const { PRODUCTS_TABLE,ProductSchema }= require('../models/product.models');
module.exports = {
  async up (queryInterface ) {
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(PRODUCTS_TABLE,ProductSchema);
  },

  async down (queryInterface ) {
await queryInterface.dropTable(CATEGORY_TABLE);
await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};

