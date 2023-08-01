

const { models } = require('../librerias/sequelize')

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async find() {
    const Orders = await models.Order.findAll()
    return Orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include:[
        {
          association:'customer',include:['user']
        },'item'
      ]
    })
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id)

    const rta = await order.update(changes)
    return rta
  }

  async addItem(data){
    // const product = await productService.findOne(data.productId);
    // if (!product) {
    //   throw boom.notFound('product not found add the new items bofore');
    // }
    const addNewItem = await models.OrdersProducts.create(data)
    return addNewItem;
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
