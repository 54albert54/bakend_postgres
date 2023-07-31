const { User, UserSchema } = require('./user.model');
const {  Customers, CustomersSchema } = require('./custumer.model');
const {  Category, CategorySchema } = require('./category.models');
const {  Products, ProductSchema } = require('./product.models');
const {  Order, OrderSchema } = require('./order.model');
const { OrdersProducts,OrdersProductsSchema} = require('./order-product.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customers.init(CustomersSchema,  Customers.config(sequelize));
  Category.init(CategorySchema,  Category.config(sequelize));
  Products.init(ProductSchema,  Products.config(sequelize));
  Order.init(OrderSchema,  Order.config(sequelize));
  OrdersProducts.init(OrdersProductsSchema,  OrdersProducts.config(sequelize));


  Customers.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Products.associate(sequelize.models)
  Order.associate(sequelize.models)

}

module.exports = setupModels;
