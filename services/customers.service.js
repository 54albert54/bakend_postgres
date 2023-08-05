const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../librerias/sequelize')
class CustomersService {
  constructor() {

  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password,10)
    const newData = {
      ...data,
      user:{
      ...data.user,
      password: hash
      }
    }
    const newCustomer = await models.Customers.create(newData,{
      include:['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const rta = await models.Customers.findAll({
      include:['user']
    })
    return rta;
  }
  async findOne2(userid) {
    const rta = await models.Customers.findAll({
      where:{
        userId:userid
      }

    })
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
    console.log("uusario a borrar",user)

    await user.destroy()
    return { id };
  }
}

module.exports = CustomersService;
