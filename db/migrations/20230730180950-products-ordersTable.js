'use strict';

const { OrdersProductsSchema,ORDERS_PRODUCTS_TABLE }= require('../models/order-product.model');

module.exports = {
  async up (queryInterface ) {
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE,OrdersProductsSchema);
  },

  async down (queryInterface ) {
await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  }
};
