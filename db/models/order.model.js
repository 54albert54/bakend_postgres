const {Model,DataTypes,Sequelize } = require ('sequelize');

const { CUSTOMERS_TABLE }=require('./custumer.model')

const ORDER_TABLE = 'order';

const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  customerId:{
    field:'customer_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    references:{
      model:CUSTOMERS_TABLE,
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customers,{
      as:'customer'
    });
    this.belongsToMany(models.Products,{
      as: 'item',
      through:models.OrdersProducts,
      foreignKey:'orderId',
      otherKey:'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = { ORDER_TABLE, OrderSchema, Order }
