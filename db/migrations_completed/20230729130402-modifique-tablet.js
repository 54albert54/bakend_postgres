'use strict';

const { CUSTOMERS_TABLE }= require('../models/custumer.model');
const {DataTypes } = require ('sequelize');

module.exports = {
  async up (queryInterface ) {
    await queryInterface.changeColumn(CUSTOMERS_TABLE,'user_id',{
      field:'user_id',
      allowNull:false,
      unique:true,        //poner de forma unica la llave foranea
      type: DataTypes.INTEGER,
    });
  },

  async down ( ) {
//await queryInterface.dropTable(CUSTOMERS_TABLE);
  }
};
