const {Model,DataTypes,Sequelize } = require ('sequelize');

const { PRODUCTS_TABLE }=require('./product.models')
const { ORDER_TABLE }=require('./order.model')


const ORDERS_PRODUCTS_TABLE = 'orders_Products';

const OrdersProductsSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId:{
    field:'order_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    references:{
      model:ORDER_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
    },
  productId:{
    field:'product_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    references:{
      model:PRODUCTS_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
    }

}

class OrdersProducts extends Model {
  static associate() {
    // this.belongsTo(models.Customers,{
    //   as:'customer'
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      modelName: 'OrdersProducts',
      timestamps: false
    }
  }
}


module.exports = { ORDERS_PRODUCTS_TABLE, OrdersProductsSchema, OrdersProducts }
