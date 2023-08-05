

const { models } = require('../librerias/sequelize')

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll()
    return orders;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where:{
        '$customer.user.id$':userId
      },
      include:[
        {
          association:'customer',include:['user']
        }
      ]
    })
    return orders;
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
    const addNewItem = await models.OrdersProducts.create(data)
    return addNewItem;
  }

  async delete(id) {
    const order =await this.findOne(id)

    await order.destroy()
    return { id };
  }

}

module.exports = OrderService;
