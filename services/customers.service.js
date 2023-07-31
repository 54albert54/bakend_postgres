const boom = require('@hapi/boom');


const { models } = require('../librerias/sequelize')
class CustomersService {
  constructor() {

  }

  async create(data) {
    //const newUser = await models.User.create(data.user)
    // const newCustomer = await models.Customers.create({
    //   ...data,
    // userId:newUser.id});


    const newCustomer = await models.Customers.create(data,{
      include:['user']
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customers.findAll({
      include:['user']
    })
    // this.belongsTo(models.User, {as:'user'});

    return rta;
  }

  async findOne(id) {
    const Costumer = await models.Customers.findByPk(id);
    if (!Costumer) {
    throw boom.notFound('Costumer no found')
    }
    return  Costumer ;
  }

  async update(id, changes) {
    const user = await this.findOne(id)

    const rta = await user.update(changes)
    return rta
  }

  async delete(id) {
    const user =await this.findOne(id)

    await user.destroy()
    return { id };
  }
}

module.exports = CustomersService;
