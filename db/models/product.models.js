const {Model,DataTypes,Sequelize } = require ('sequelize');

const { CATEGORY_TABLE }=require('./category.models')

const PRODUCTS_TABLE = 'products';

const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  categoryId:{
    field:'category_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    references:{
      model:CATEGORY_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
    },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categories,{
      as:'category',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Products',
      timestamps: false
    }
  }
}


module.exports = { PRODUCTS_TABLE, ProductSchema, Products }
